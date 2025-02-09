var minDate = null;
var maxDate = null;
var currentDateRange = [];

const STARTDATE_COLUMN = 'I'
const STARTDATE_RANGE = 'I9:I'
const STARTDATE_COL_NO = 9
const ENDDATE_COLUMN = 'J'
const ENDDATE_RANGE = 'J9:J'
const ENDDATE_COL_NO = 10
const TIMELINE_STARTCELL = 'N8' 
const TIMELINE_START_ROW = 8
const TIMELINE_START_COL = 14
const DATE_RANGE = 'I9:J'
const TASK_START_ROW = 9
const DURATION_COL_NO = 11

/*
 * Refresh every time
*/
function onEdit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Get the active sheet
  const range = e.range; // The range that was edited
  const row = range.getRow();

  const columnLetter = range.getA1Notation().charAt(0);

  if (row < TASK_START_ROW) return;

  if (columnLetter === STARTDATE_COLUMN || columnLetter === ENDDATE_COLUMN) {
    const row = range.getRow(); // Get the row of the edited cell
    updateRow(row, sheet);
  }
}

/*
 * Main flow
*/

function updateRow (row, sheet) {
  duration = calculateDuration (row, sheet) 

  if (!duration) {
    // If no duration is calculated, remove highlights and duration for that row
    clearHighlightsAndDuration(row, sheet);
  } 

  // check if the project
  const needAdjust = checkNewDate (row, sheet)

  if (needAdjust) {
    handleTimelineAdjustment(sheet);
  } else {
    highlightChart(row, sheet, duration);
  }
  
}

/*
 *Calculate Duration, for highligh
*/
function calculateDuration (row, sheet) {
  const startDate = sheet.getRange(row, STARTDATE_COL_NO).getValue();
  const dueDate = sheet.getRange(row, ENDDATE_COL_NO).getValue();
  if (!startDate || !dueDate) return null;

  const start = new Date(startDate);
  const end = new Date(dueDate);

  const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  sheet.getRange(row, DURATION_COL_NO).setValue(duration);
  return duration
}

function checkNewDate(row, sheet) {
  const start = sheet.getRange(row, STARTDATE_COL_NO).getValue(); // Start date (column E)
  const end = sheet.getRange(row, ENDDATE_COL_NO).getValue(); // End date (column F)
  let needAdjust = false;


  // Retrieve stored minDate and maxDate
  const properties = PropertiesService.getScriptProperties();

  // Check if both dates are removed
  if (!start && !end) {
    // Reevaluate the timeline range for all rows
    reevaluateTimelineRange(sheet);
    return true;
  }

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
  sheet.getRange(TIMELINE_START_ROW, TIMELINE_START_COL, 1, maxColumns - TIMELINE_START_COL).clearContent();

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
  const start = new Date(sheet.getRange(row, STARTDATE_COL_NO).getValue());
  const end = new Date(sheet.getRange(row, ENDDATE_COL_NO).getValue());
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
  const taskStartRow = TASK_START_ROW;
  const taskEndRow = sheet.getLastRow();

  for (let row = taskStartRow; row <= taskEndRow; row++) {
    sheet.getRange(row, timelineStartColIndex, 1, maxColumns - timelineStartColIndex + 1).setBackground(null);
  }
}

function applyAllHighlights(sheet) {
  const taskStartRow = TASK_START_ROW;
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

function clearHighlightsAndDuration(row, sheet) {
  const timelineStartCell = sheet.getRange(TIMELINE_STARTCELL);
  const timelineStartColIndex = timelineStartCell.getColumn();
  const maxColumns = sheet.getMaxColumns();

  // Clear the highlights
  sheet.getRange(row, timelineStartColIndex, 1, maxColumns - timelineStartColIndex + 1).setBackground(null);

  // Clear the duration cell
  sheet.getRange(row, DURATION_COL_NO).clearContent();
}

function reevaluateTimelineRange(sheet) {
  const taskStartRow = TASK_START_ROW;
  const taskEndRow = sheet.getLastRow();

  minDate = null;
  maxDate = null;

  for (let row = taskStartRow; row <= taskEndRow; row++) {
    const start = sheet.getRange(row, STARTDATE_COL_NO).getValue();
    const end = sheet.getRange(row, ENDDATE_COL_NO).getValue();

    if (start instanceof Date && (!minDate || start < minDate)) {
      minDate = start;
    }
    if (end instanceof Date && (!maxDate || end > maxDate)) {
      maxDate = end;
    }
  }

  const properties = PropertiesService.getScriptProperties();

  if (minDate && maxDate) {
    // If there are valid dates, update the properties and adjust the timeline
    properties.setProperty("minDate", minDate.toISOString());
    properties.setProperty("maxDate", maxDate.toISOString());
    adjustTimeline(sheet, minDate, maxDate);
  } else {
    // If no valid dates exist, clear the properties and reset the timeline
    properties.deleteProperty("minDate");
    properties.deleteProperty("maxDate");
    sheet.getRange(TIMELINE_START_ROW, TIMELINE_START_COL, 1, sheet.getMaxColumns() - TIMELINE_START_COL).clearContent();
  }
}
