const db = require('./db.service')

async function get(username) {
  const records = await db.query("SELECT pronouns, schedule, discord_username, notes, slot_length from streamer where username = ?;",
    [username]);
  return {
    pronouns: (records && records[0] && records[0].pronouns) ? records[0].pronouns : '',
    schedule: (records && records[0] && records[0].schedule) ? JSON.parse(records[0].schedule) : {},
    discordUsername: (records && records[0] && records[0].discord_username) ? records[0].discord_username : '',
    notes: (records && records[0] && records[0].notes) ? records[0].notes : '',
    slotLength: (records && records[0] && records[0].slot_length) ? records[0].slot_length : '',
    username
  }
}

async function updateSchedule(username, schedule) {
  return await db.query("UPDATE streamer set schedule = ? where username = ?;",
    [schedule, username]);
}

async function updateText(username, notes, discordUsername, pronouns, slotLength) {
  return await db.query("UPDATE streamer set pronouns = ?, notes = ?, discord_username = ?, slot_length = ? where username = ?;",
    [pronouns, notes, discordUsername, slotLength, username]);
}


module.exports = {
  get,
  updateSchedule,
  updateText
}
