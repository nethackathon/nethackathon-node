const db = require('./db.service')

async function getAdventurer(characterName) {
  const records = db.query("SELECT claimed_by from adventurer where character_name = ? limit 1;", 
    [characterName]);
  return {
    claimedBy: records[0]['claimed_by']
  }
}

async function claimAdventurer(claimee, characterName) {
  const rowsUpdated = db.query("UPDATE adventurer set claimed_by = ? where character_name = ? and claimed_by is NULL", 
    [claimee, characterName]);
  const claimSuccessful = (rowsUpdated > 0);
  let claimedBy = claimee;
  if (!claimSuccessful) {
    const records = db.query("SELECT claimed_by from adventurer where character_name = ? limit 1;", 
      [characterName]);
    claimedBy = records[0]['claimed_by'];
  }
  return {
    claimSuccessful,
    claimedBy
  }
}

module.exports = {
  getAdventurer,
  claimAdventurer
}