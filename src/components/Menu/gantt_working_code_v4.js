/*
 * When edited it run onEdit, only if start date and end date column it will continue the program
 * When there is a problem, run updateSheet
*/

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
const HIGHLIGHT_COLOR = '#0b5394'



/* ================================================== START ======================================================*/

/**
 * Main flow: Recalculate min/max dates, adjust timeline, and highlight tasks.
 */
function updateSheet(sheet) {
  const { minDate, maxDate } = recalculateDateRange(sheet);

  if (minDate && maxDate) {
    adjustTimeline(sheet, minDate, maxDate);
  } else {
    clearTimeline(sheet);
  }

  applyAllHighlights(sheet);
}

/**
 * Recalculate the overall min and max dates dynamically.
 */
function recalculateDateRange(sheet) {
  const startDateRange = sheet.getRange(STARTDATE_RANGE).getValues(); // Get all start dates
  const endDateRange = sheet.getRange(ENDDATE_RANGE).getValues(); // Get all end dates

  // Flatten the arrays and combine start and end dates
  const allDates = [...startDateRange.flat(), ...endDateRange.flat()]
    .filter(date => date instanceof Date && !isNaN(date)); // Filter valid Date objects

  if (allDates.length === 0) {
    // No valid dates found
    return { minDate: null, maxDate: null };
  }

  // Calculate the min and max dates
  const minDate = new Date(Math.min(...allDates.map(date => date.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(date => date.getTime())));

  return { minDate, maxDate };
}


/**
 * Adjust the timeline based on min and max dates.
 */
function adjustTimeline(sheet, minDate, maxDate) {
  const timelineStartCell = sheet.getRange(TIMELINE_STARTCELL);
  const maxColumns = sheet.getMaxColumns();

  sheet
    .getRange(TIMELINE_START_ROW, TIMELINE_START_COL, 1, maxColumns - TIMELINE_START_COL)
    .clearContent();

  let currentDate = new Date(minDate);
  let colIndex = timelineStartCell.getColumn();
  let rowIndex = timelineStartCell.getRow();

  while (currentDate <= maxDate) {
    sheet.getRange(rowIndex, colIndex).setValue(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
    colIndex++;
  }
}

/**
 * Clear the timeline if no valid dates exist.
 */
function clearTimeline(sheet) {
  const maxColumns = sheet.getMaxColumns();
  sheet
    .getRange(TIMELINE_START_ROW, TIMELINE_START_COL, 1, maxColumns - TIMELINE_START_COL)
    .clearContent();
}

/**
 * Apply highlights to all tasks.
 */
function applyAllHighlights(sheet) {
  const dateMap = getTimelineDateMap(sheet);
  const taskStartRow = TASK_START_ROW;
  const taskEndRow = sheet.getLastRow();
  const batchSize = 50; // Process 50 rows at a time

  for (let row = taskStartRow; row <= taskEndRow; row++) {
    const duration = calculateDuration(row, sheet);
    if (duration) {
      highlightChart(row, sheet, duration, dateMap);
    }
  }
}

/* ================================================= END =========================================================*/


/**
 * Refresh every time an edit occurs.
 */
function onEdit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = e.range;
  const row = range.getRow();
  const columnLetter = range.getA1Notation().charAt(0);

  if (row >= TASK_START_ROW && 
      (columnLetter === STARTDATE_COLUMN || columnLetter === ENDDATE_COLUMN)) {
    const duration = calculateDuration(row, sheet);
    const startDate = sheet.getRange(row, STARTDATE_COL_NO).getValue();

    if (duration) {
      const { minDate, maxDate } = recalculateDateRange(sheet);
      if ( !minDate || startDate < minDate ) { // if start is less than minDate, redraw all chart
        updateSheet(sheet)
      } else { // start > minDate or end edited, adjust timeline n highlight particular row only
        adjustTimeline(sheet, minDate, maxDate);
        const dateMap = getTimelineDateMap(sheet);
        highlightChart(row, sheet, duration, dateMap);
      }
    } else { // either start date or end date deleted, remove highlight & duration
      sheet.getRange(row, DURATION_COL_NO).setValue(null);
      sheet
      .getRange(row, TIMELINE_START_COL, 1, sheet.getMaxColumns() - TIMELINE_START_COL + 1)
      .setBackground(null); // Clear previous highlights
    }
  }
}

function highlightChart(row, sheet, duration, dateMap) {

  const start = new Date(sheet.getRange(row, STARTDATE_COL_NO).getValue());
  const taskStartColIndex = findColumnIndexForDate(start, dateMap);

  if (taskStartColIndex) {
    const timelineStartCell = sheet.getRange(TIMELINE_STARTCELL);
    const timelineStartColIndex = timelineStartCell.getColumn();
    const maxColumns = sheet.getMaxColumns();

    sheet
      .getRange(row, timelineStartColIndex, 1, maxColumns - timelineStartColIndex + 1)
      .setBackground(null); // Clear previous highlights
    sheet.getRange(row, taskStartColIndex, 1, duration).setBackground(HIGHLIGHT_COLOR); // Highlight the task range
  }
}

/**
 * Calculate the duration of a task.
 */
function calculateDuration(row, sheet) {
  const startDate = sheet.getRange(row, STARTDATE_COL_NO).getValue();
  const dueDate = sheet.getRange(row, ENDDATE_COL_NO).getValue();
  if (!startDate || !dueDate) return null;

  const start = new Date(startDate);
  const end = new Date(dueDate);

  const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  sheet.getRange(row, DURATION_COL_NO).setValue(duration);
  return duration;
}


/**
 * Optimize Timeline Column Search

Instead of iterating over all timeline columns in findColumnIndexForDate, use a map of dates to column indices for fast lookup.
 */
function getTimelineDateMap(sheet) {
  const timelineStartCell = sheet.getRange(TIMELINE_STARTCELL);
  const timelineRowIndex = timelineStartCell.getRow();
  const timelineStartColIndex = timelineStartCell.getColumn();
  const maxColumns = sheet.getMaxColumns();

  const timelineRange = sheet
    .getRange(timelineRowIndex, timelineStartColIndex, 1, maxColumns - timelineStartColIndex + 1)
    .getValues()[0];

  

  const dateMap = new Map();
  for (let colIndex = 0; colIndex < timelineRange.length; colIndex++) {
    const timelineDate = timelineRange[colIndex];
    if (timelineDate instanceof Date) {
      dateMap.set(timelineDate.getTime(), timelineStartColIndex + colIndex);
    }
  }

  return dateMap;
}

function findColumnIndexForDate(date, dateMap) {
  return dateMap.get(date.getTime()) || null;
}






















