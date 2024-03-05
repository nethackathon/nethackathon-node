const db = require('./db.service')

async function get(username) {
  const [record] = await db.query(
    "SELECT pronouns, schedule, discord_username, notes, slot_length from streamer where username = ?;",
    [username]
  );
  return {
    pronouns: record?.pronouns ?? '',
    schedule: record?.schedule ?? {},
    discordUsername: record?.discord_username ?? '',
    notes: record?.notes ?? '',
    slotLength: record?.slot_length ?? '',
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
