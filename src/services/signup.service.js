const db = require('./db.service')

async function get(username) {
  const [record] = await db.query(
    `SELECT s.pronouns, s.schedule, s.discord_username, s.notes, s.slot_length, s.checklist,
     es.start_time, es.end_time, es.survey,
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
    survey: record?.survey ?? '{}',
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

async function updateSurvey(username, survey) {
  return await db.query(`UPDATE event_streamer es set survey = ?
                         where es.event_id = (select id from event order by event_start desc limit 1)                     
                         and es.streamer_id = (select id from streamer where username = ?);`,
    [survey, username]);
}

async function createEventMedia(
  username,
  eventId,
  mediaType,
  videoType,
  platform,
  mediaUrl,
  thumbnailUrl,
  title,
  description,
  startTime,
  endTime
) {
  return await db.query(`
  INSERT INTO event_media (event_id, submitted_by, media_type, video_type, platform, media_url, thumbnail_url, title, description, start_time, end_time)
  VALUES (
    ?,
    (select id from streamer where username = ?),
    ?, ?, ?, ?, ?, ?, ?, ?, ?
  );`,
    [eventId, username, mediaType, videoType, platform, mediaUrl, thumbnailUrl, title, description, startTime, endTime]);
}

async function updateEventMedia(
  eventMediaId,
  mediaType,
  videoType,
  platform,
  mediaUrl,
  thumbnailUrl,
  title,
  description,
  startTime,
  endTime
) {
  return await db.query(`
              UPDATE event_media SET
                                     media_type = ?,
                                     video_type = ?,
                                     platform = ?,
                                     media_url = ?,
                                     thumbnail_url = ?,
                                     title = ?,
                                     description = ?,
                                     start_time = ?,
                                     end_time = ?
              WHERE id = ?;`,
    [mediaType, videoType, platform, mediaUrl, thumbnailUrl, title, description, startTime, endTime, eventMediaId]);
}

async function getEventMedia(username) {
  return await db.query(`
  SELECT id, event_id, media_type, video_type, platform, media_url, thumbnail_url, title, description, start_time, end_time
  FROM event_media
  WHERE submitted_by = (select id from streamer where username = ?);`,
    [username]);
}

module.exports = {
  createEventMedia,
  getEventMedia,
  get,
  updateEventMedia,
  updateSchedule,
  updateSurvey,
  updateText,
  updateChecklist,
}
