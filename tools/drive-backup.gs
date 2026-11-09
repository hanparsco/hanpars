/**
 * hanpars.com → Google Drive daily backup
 * Copies the complete site archive (built by GitHub Actions every day at 02:00 Tehran) into the Drive folder
 * "hanpars-com-backup" as hanpars-com-backup-YYYY-MM-DD.zip and keeps the last KEEP days.
 *
 * One-time setup (2 minutes):
 *   1. Open https://script.google.com → New project → paste this whole file → Save.
 *   2. Choose the function "setup" in the toolbar → Run → allow the permissions (Drive + external request).
 *   Done: it saves today's copy immediately and then runs every day between 03:00 and 04:00 Tehran time.
 */
const FOLDER_ID = '1o31RBCua8UV5W_dkTxoAWGKcEZ7eEbqm';   // Drive folder "hanpars-com-backup"
const SOURCE = 'https://github.com/hanparsco/hanpars/releases/download/backup-latest/hanpars-com-backup-latest.zip';
const KEEP = 7;                                            // daily copies to keep

function backupHanpars() {
  const res = UrlFetchApp.fetch(SOURCE, { followRedirects: true, muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) throw new Error('Download failed: HTTP ' + res.getResponseCode());
  const name = 'hanpars-com-backup-' + Utilities.formatDate(new Date(), 'Asia/Tehran', 'yyyy-MM-dd') + '.zip';
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const same = folder.getFilesByName(name);
  while (same.hasNext()) same.next().setTrashed(true);
  folder.createFile(res.getBlob().setName(name).setContentType('application/zip'));
  const copies = [];
  const it = folder.getFiles();
  while (it.hasNext()) { const f = it.next(); if (/^hanpars-com-backup-\d{4}-\d{2}-\d{2}\.zip$/.test(f.getName())) copies.push(f); }
  copies.sort((a, b) => b.getName().localeCompare(a.getName()));
  copies.slice(KEEP).forEach(f => f.setTrashed(true));
}

function setup() {
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'backupHanpars') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('backupHanpars').timeBased().everyDays(1).atHour(3).inTimezone('Asia/Tehran').create();
  backupHanpars();
}
