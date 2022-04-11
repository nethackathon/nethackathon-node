const db = require('./db.service')

async function getEggs() {
  return await db.query(`
    select s.username, a.name, a.type from achievement a 
        left join streamer_achievement sa on sa.achievement_id = a.id 
        left join streamer s on s.id = sa.streamer_id
        where a.type = "egg"`);
}

async function updateAchievement(username, achievement) {
  const rows = await db.query(`
    select id from streamer_achievement where
      streamer_id = (select id from streamer where username = ?) and
      achievement_id = (select id from achievement where name = ?);`, 
    [username, achievement]);
  if (rows.length > 0) {
    await db.query(`
      delete from streamer_achievement where
      streamer_id = (select id from streamer where username = ?) and
      achievement_id = (select id from achievement where name = ?);`,
      [username, achievement]);
  } else {
    await db.query(`
      insert into streamer_achievement (streamer_id, achievement_id)
      values (
              (select id from streamer where username = ?),
              (select id from achievement where name = ?)
             );`,
      [username, achievement]);
  }
}


module.exports = {
  getEggs,
  updateAchievement
}