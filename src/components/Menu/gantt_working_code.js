var minDate = null;
var maxDate = null;
var currentDateRange = [];

const STARTDATE_COLUMN = 'E'
const STARTDATE_RANGE = 'E9:E'
const ENDDATE_COLUMN = 'F'
const ENDDATE_RANGE = 'F9:F'
const TIMELINE_STARTCELL = 'I8' 
const DATE_RANGE = 'E9:F'

function onOpen(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Get the active sheet
  const dateRange = sheet.getRange(DATE_RANGE).getValues(); // Fetch the date range from E9:F
  const timelineStartCell = sheet.getRange(TIMELINE_STARTCELL); // The starting cell of the Gantt chart timeline

  // let minDate = null;
  // let maxDate = null;

  // Find the minimum start date and maximum end date in the date range
  dateRange.forEach(row => {
    const [start, end] = row;
    if (start instanceof Date && end instanceof Date) { // Check if both are valid dates
      if (!minDate || start < minDate) minDate = start; // Compare new start with old start, if lesser become new start
      if (!maxDate || end > maxDate) maxDate = end; // Compare new end with old end, if larger become new end
    } 
  });



  const maxColumns = sheet.getMaxColumns(); // Get total number of columns in the sheet
  sheet.getRange(8, 10, 1, maxColumns - 9).clearContent(); // Clear from J8 onward

  let currentDate = new Date(startDate);
  let colIndex = timelineStartCell.getColumn();
  let rowIndex = timelineStartCell.getRow();

  while (currentDate <= maxDate) {
    sheet.getRange(rowIndex, colIndex).setValue(currentDate);
    sheet.getRange(rowIndex, colIndex).setNumberFormat("dd/mm/yyyy"); // Set the format to dd/mm/yyyy
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
    colIndex++; // Move to the next column
  }
}

function onEdit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Get the active sheet
  const range = e.range; // The range that was edited
  const row = range.getRow();

  const columnLetter = range.getA1Notation().charAt(0);

  if (row < 9) return;

  if (columnLetter === "E" || columnLetter === "F") {
    const row = range.getRow(); // Get the row of the edited cell
    updateRow(row, sheet);
  }
}

function updateRow (row, sheet) {
  duration = calculateDuration (row, sheet) 
  const needAdjust = checkNewDate (row, sheet)

  if (needAdjust) {
    handleTimelineAdjustment(sheet);
  } else {
    highlightChart(row, sheet, duration);
  }
  
}

function calculateDuration (row, sheet) {
  const startDate = sheet.getRange(row, 5).getValue();
  const dueDate = sheet.getRange(row, 6).getValue();
  if (!startDate || !dueDate) return null;

  const start = new Date(startDate);
  const end = new Date(dueDate);

  const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  sheet.getRange(row, 7).setValue(duration);
  return duration
}

function checkNewDate(row, sheet) {
  const start = sheet.getRange(row, 5).getValue(); // Start date (column E)
  const end = sheet.getRange(row, 6).getValue(); // End date (column F)
  let needAdjust = false;

  // Retrieve stored minDate and maxDate
  const properties = PropertiesService.getScriptProperties();
  const storedMinDate = properties.getProperty("minDate");
  const storedMaxDate = properties.getProperty("maxDate");

  // Parse stored dates
  minDate = storedMinDate ? new Date(storedMinDate) : null;
  maxDate = storedMaxDate ? new Date(storedMaxDate) : null;

  // **Condition for expanding minDate**
  if (start instanceof Date && (!minDate || start < minDate)) {
    minDate = start;
    needAdjust = true;
  } else if (end instanceof Date && (!maxDate || end > maxDate)) {
    maxDate = end;
    needAdjust = true;
  }

  // Persist the updated minDate and maxDate
  if (needAdjust) {
    properties.setProperty("minDate", minDate ? minDate.toISOString() : "");
    properties.setProperty("maxDate", maxDate ? maxDate.toISOString() : "");
    adjustTimeline(sheet, minDate, maxDate);
    handleTimelineAdjustment(sheet); // Reset and reapply highlights
  }
}

function adjustTimeline(sheet, minDate, maxDate) {
  currentDateRange = [];
  const timelineStartCell = sheet.getRange(TIMELINE_STARTCELL);
  const maxColumns = sheet.getMaxColumns();
  sheet.getRange(8, 10, 1, maxColumns - 9).clearContent();

  let currentDate = new Date(minDate);
  let colIndex = timelineStartCell.getColumn();
  let rowIndex = timelineStartCell.getRow();

  while (currentDate <= maxDate) {
    sheet.getRange(rowIndex, colIndex).setValue(new Date(currentDate));
    currentDateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
    colIndex++;
  }
}

function highlightChart(row, sheet, duration) {
  const start = new Date(sheet.getRange(row, 5).getValue());
  const end = new Date(sheet.getRange(row, 6).getValue());
  const taskStartColIndex = findColumnIndexForDate(start);

  if (taskStartColIndex) {
    const timelineStartCell = sheet.getRange(TIMELINE_STARTCELL);
    const timelineStartColIndex = timelineStartCell.getColumn();
    const maxColumns = sheet.getMaxColumns();

    sheet.getRange(row, timelineStartColIndex, 1, maxColumns - timelineStartColIndex + 1).setBackground(null); // Clear previous highlights
    sheet.getRange(row, taskStartColIndex, 1, duration).setBackground("#7CFC00"); // Highlight the task range
  }
}

function findColumnIndexForDate(date) {
  const timelineStartCell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(TIMELINE_STARTCELL);
  const timelineRowIndex = timelineStartCell.getRow();
  const timelineStartColIndex = timelineStartCell.getColumn();
  const maxColumns = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getMaxColumns();

  const timelineRange = SpreadsheetApp.getActiveSpreadsheet()
    .getActiveSheet()
    .getRange(timelineRowIndex, timelineStartColIndex, 1, maxColumns - timelineStartColIndex + 1)
    .getValues()[0];

  for (let colIndex = 0; colIndex < timelineRange.length; colIndex++) {
    const timelineDate = new Date(timelineRange[colIndex]);
    if (timelineDate.getTime() === date.getTime()) {
      return timelineStartColIndex + colIndex;
    }
  }
  return null;
}

function resetAllHighlights(sheet) {
  const timelineStartCell = sheet.getRange(TIMELINE_STARTCELL);
  const timelineStartColIndex = timelineStartCell.getColumn();
  const maxColumns = sheet.getMaxColumns();
  const taskStartRow = 9;
  const taskEndRow = sheet.getLastRow();

  for (let row = taskStartRow; row <= taskEndRow; row++) {
    sheet.getRange(row, timelineStartColIndex, 1, maxColumns - timelineStartColIndex + 1).setBackground(null);
  }
}

function applyAllHighlights(sheet) {
  const taskStartRow = 9;
  const taskEndRow = sheet.getLastRow();

  for (let row = taskStartRow; row <= taskEndRow; row++) {
    const duration = calculateDuration(row, sheet);
    if (duration) {
      highlightChart(row, sheet, duration);
    }
  }
}

function handleTimelineAdjustment(sheet) {
  resetAllHighlights(sheet);
  applyAllHighlights(sheet);
}
