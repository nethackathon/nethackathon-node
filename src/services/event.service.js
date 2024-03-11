const db = require('./db.service')

async function getEventById(eventId) {
  const records = await db.query('select * from event where id = ?;', [eventId]);
  return([records]);
}

async function getEvents() {
  const records = await db.query('select * from event order by event_start;');
  return(records);
}

async function getCurrentEvent() {
  // TODO: Add event_charity table and join here
  const records = await db.query(
    `select *, null as charity from event
      order by event_start
      desc limit 1;`
  );
  return(records[0]);
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
  getCurrentEvent,
  getEventById,
  getEvents,
  getMediaByEventId,
  getStreamersByEventId,
}
