const db = require('./db.service')

async function getTagline() {
  const records = await db.query("SELECT tagline from tagline order by RAND() limit 1;");
  return(records[0]);
}

async function getStreamers() {
  const records = await db.query("SELECT username from streamer where length(schedule) > 2;");
  return { streamers: records };
}

async function getStreamersSchedule() {
  const records = await db.query("SELECT username, schedule from streamer where 1;");
  return { streamers : records };
}

module.exports = {
  getTagline,
  getStreamers,
  getStreamersSchedule
}