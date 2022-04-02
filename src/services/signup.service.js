const db = require('./db.service')

async function get(username) {
  const records = await db.query("SELECT schedule, discord_username, notes from streamer where username = ?;", 
    [username]);
  return {
    schedule: (records && records[0] && records[0].schedule) ? JSON.parse(records[0].schedule) : [],
    discordUsername: (records && records[0] && records[0].discord_username) ? records[0].discord_username : '',
    notes: (records && records[0] && records[0].notes) ? records[0].notes : '',
    username
  }
}

async function updateSchedule(username, schedule) {
  return await db.query("UPDATE streamer set schedule = ? where username = ?;", 
    [schedule, username]);
}

async function updateText(username, notes, discordUsername) {
  return await db.query("UPDATE streamer set notes = ?, discord_username = ? where username = ?;", 
    [notes, discordUsername, username]);
}


module.exports = {
  get,
  updateSchedule,
  updateText
}