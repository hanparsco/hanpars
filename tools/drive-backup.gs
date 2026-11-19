/**
 * hanpars.com -> Google Drive daily backup (Apps Script project "hanpars-com-daily-backup" in the owner's Google account)
 * Copies the complete site archive (rebuilt by GitHub Actions every night; GitHub starts it 0-6 h late) into the Drive
 * folder "hanpars-com-backup" as hanpars-com-backup-YYYY-MM-DD.zip and keeps the last KEEP days.
 * Runs every day between 12:00 and 13:00 Tehran time. If the GitHub archive is older than MAX_AGE_H hours
 * (the nightly build did not run), the copy is still saved but the run ends with an error, so Google e-mails the owner.
 */
const FOLDER_ID = '1o31RBCua8UV5W_dkTxoAWGKcEZ7eEbqm';   // Drive folder "hanpars-com-backup"
const SOURCE = 'https://github.com/hanparsco/hanpars/releases/download/backup-latest/hanpars-com-backup-latest.zip';
const RELEASE_API = 'https://api.github.com/repos/hanparsco/hanpars/releases/tags/backup-latest';
const KEEP = 7;                                            // daily copies to keep
const MAX_AGE_H = 30;                                      // archive older than this = nightly build missed

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
  // freshness check: fail the run (Google e-mails the owner) if GitHub's nightly rebuild did not happen
  const rel = UrlFetchApp.fetch(RELEASE_API, { muteHttpExceptions: true, headers: { 'User-Agent': 'hanpars-backup' } });
  if (rel.getResponseCode() === 200) {
    const asset = (JSON.parse(rel.getContentText()).assets || [])[0];
    const ageH = asset ? (Date.now() - new Date(asset.updated_at).getTime()) / 36e5 : 999;
    if (ageH > MAX_AGE_H) throw new Error('Saved ' + name + ', but the GitHub archive is ' + Math.round(ageH) + ' h old: the nightly build did not run.');
  }
}

function setup() {
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === 'backupHanpars') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('backupHanpars').timeBased().everyDays(1).atHour(12).inTimezone('Asia/Tehran').create();
  backupHanpars();
}
