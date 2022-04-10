const db = require('./db.service')

async function getAdventurer(characterName) {
  const records = await db.query("SELECT claimed_by from adventurer where character_name = ? limit 1;", 
    [characterName]);
  return {
    claimedBy: records[0]['claimed_by']
  }
}

async function claimAdventurer(claimee, characterName) {
  const results = await db.query("UPDATE adventurer set claimed_by = ?, claimed_at = now() where character_name = ? and claimed_by is NULL", 
    [claimee, characterName]);
  const claimSuccessful = (results.affectedRows > 0);
  let claimedBy = claimee;
  if (!claimSuccessful) {
    const records = await db.query("SELECT claimed_by from adventurer where character_name = ? limit 1;", 
      [characterName]);
    claimedBy = records[0]['claimed_by'];
  }
  return {
    claimSuccessful,
    claimedBy
  }
}

async function recordUpload(characterName, uploadedBy, fileName) {
  console.log('recordUpload', characterName, uploadedBy, fileName);
  return db.query("INSERT into upload (character_name, uploaded_by, file_name, uploaded_at) values (?, ?, ?, now());",
    [characterName, uploadedBy, fileName]);
}

async function getLatestUpload(characterName) {
  const records = await db.query("SELECT * from upload where character_name = ? order by uploaded_at desc limit 1;",
    [characterName]);
  return {
    characterName: records[0]['character_name'],
    uploadedBy: records[0]['uploaded_by'],
    fileName: records[0]['file_name'],
    uploadedAt: records[0]['uploaded_at']
  }
}

async function releaseAdventurer(claimee, characterName) {
  const rowsUpdated = await db.query("UPDATE adventurer set claimed_by = NULL where character_name = ? and claimed_by = ?",
    [characterName, claimee]);
  const releaseSuccessful = (rowsUpdated > 0);
  if (!releaseSuccessful) {
    const records = await db.query("SELECT claimed_by from adventurer where character_name = ? limit 1;",
      [characterName]);
    claimedBy = records[0]['claimed_by'];
  }
  return {
    releaseSuccessful,
    claimedBy
  }
}

module.exports = {
  getAdventurer,
  claimAdventurer,
  releaseAdventurer,
  getLatestUpload,
  recordUpload
}