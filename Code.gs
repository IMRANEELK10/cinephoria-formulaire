const SHEET_NAME = 'Responses';
const HEADERS = ['Timestamp', 'Full name', 'Phone', 'Email', 'Study field',
                 'Favorite genre', 'Favorite film', 'Attend regularly', 'Skills'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    const p = e.parameter;
    sheet.appendRow([new Date(), p.name, "'" + p.phone, p.email, p.study,
                     p.genre, p.film, p.attend, p.skills]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
