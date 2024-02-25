const db = require('./db.service')

async function getEvents() {
  const records = await db.query('select * from event order by event_start;');
  return(records);
}

async function getStreamersByEventId(eventId) {
  const records = await db.query(
    `select distinct s.username
      from event_streamer es
      left join streamer s on s.id = es.streamer_id
      where es.event_id = ?
      order by s.username;`,
  [eventId]);
  return(records.map(o => o.username));
}

async function getMediaByEventId(eventId) {
  const records = await db.query(
    'select * from event_media where event_id = ? order by start_time;',
    [eventId]
  );
  return(records);
}

module.exports = {
  getEvents,
  getMediaByEventId,
  getStreamersByEventId,
}
