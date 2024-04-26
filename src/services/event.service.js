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
  const records = await db.query(
    `select e.*,
         c.charity_name, c.charity_description, c.charity_url, c.giving_url
         from event e
         left join event_charity c on c.event_id = e.id
         order by e.event_start desc
         limit 1;`
  );
  return(records[0]);
}

async function getLastEvent() {
  const records = await db.query(
    `select e.*
         from event e
         where e.event_start < (select max(event_start) from event)
         order by e.event_start desc
         limit 1;`
  );
  return(records[0]);
}

async function getCurrentEventSchedule() {
  const records = await db.query(
    `select streamer.username, event_streamer.start_time, event_streamer.end_time, event_streamer.notes
          from event_streamer
          left join streamer on streamer.id = event_streamer.streamer_id
          where event_streamer.event_id = (select id from event order by event_start desc limit 1)
          order by event_streamer.start_time;`
  );
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
    `select * from event_media
     where admin_verified = 1
       and event_id = ?
     order by start_time;`,
    [eventId]
  );
  return(records);
}

async function getScheduleByEventId(eventId) {
  const records = await db.query(
    `select streamer.username, event_streamer.start_time, event_streamer.end_time, event_streamer.notes
          from event_streamer
          left join streamer on streamer.id = event_streamer.streamer_id
          where event_streamer.event_id = ?
          order by event_streamer.start_time;`
  ,[eventId]);
  return(records);
}

module.exports = {
  getCurrentEvent,
  getCurrentEventSchedule,
  getEventById,
  getEvents,
  getLastEvent,
  getMediaByEventId,
  getScheduleByEventId,
  getStreamersByEventId,
}
