const db = require('./db.service')

async function get(username) {
  const [record] = await db.query(
    `SELECT s.pronouns, s.schedule, s.discord_username, s.notes, s.slot_length, s.checklist,
     es.start_time, es.end_time,
        (select ns.username
         from event_streamer nes
         left join streamer ns on ns.id = nes.streamer_id
         where nes.start_time = es.end_time) as next_streamer
     from streamer s
     left join event_streamer es
               on s.id = es.streamer_id
               and es.event_id = (select id from event order by event_start desc limit 1)
     where s.username = ?;`,
    [username]
  );
  return {
    pronouns: record?.pronouns ?? '',
    schedule: record?.schedule ?? '{}',
    discordUsername: record?.discord_username ?? '',
    notes: record?.notes ?? '',
    slotLength: record?.slot_length ?? '',
    username,
    startTime: record?.start_time ?? '',
    endTime: record?.end_time ?? '',
    nextStreamer: record?.next_streamer ?? '',
    checklist: record?.checklist ?? '{}',
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

async function updateChecklist(username, checklist) {
  return await db.query("UPDATE streamer set checklist = ? where username = ?;",
    [checklist, username]);
}


module.exports = {
  get,
  updateSchedule,
  updateText,
  updateChecklist,
}
