const db = require('./db.service')

async function getTagline() {
  const records = await db.query("SELECT tagline from tagline order by RAND() limit 1;");
  return (records[0]);
}

async function getStreamers() {
  const records = await db.query(`
    SELECT s.username from event_streamer
      left join streamer s on s.id = event_streamer.streamer_id
      where es.event_id in (select id from event order by event_start desc limit 1)
      order by s.username;`);
  return { streamers: records };
}

async function getStreamersSchedule() {
  const records = await db.query(`
    SELECT s.username, s.slot_length, es.schedule
      from event_streamer es
      left join streamer s
        on s.id = es.streamer_id
        where es.event_id = (select id from event order by event_start desc limit 1)
        and es.signed_up = 1;`);
  return { streamers: records };
}

module.exports = {
  getTagline,
  getStreamers,
  getStreamersSchedule
}
