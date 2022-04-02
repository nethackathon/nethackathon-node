const db = require('./db.service')

async function updateSokoban(username, turnCount, timeSeconds, sokoLevel, sokoSubLevel, sokoPath) {
  return await db.query(`insert into sokoban (user_id, turn_count, time_seconds, soko_level, soko_sublevel, soko_path)
                         values ((select id from user where username = ? limit 1), ?, ?, ?, ?, ?);`,
    [username, turnCount, timeSeconds, sokoLevel, sokoSublevel, sokoPath]);
}

async function getTime(sokoLevel, sokoSublevel) {
  return await db.query(`
              select s1.user_id,
                     (select username from user where id = s1.user_id) as player,
                     s1.time_seconds,
                     s1.turn_count,
                     s1.soko_path
              from sokoban s1
                       inner join
                   (
                       select user_id, min(time_seconds) as min_time_seconds
                       from sokoban
                       where soko_level = ?
                         and soko_sublevel = ?
                       group by user_id
                   ) as s2
                   on s1.user_id = s2.user_id
              where s2.min_time_seconds = s1.time_seconds
                and soko_level = ?
                and soko_sublevel = ?
              order by s2.min_time_seconds limit 20;
    `,
    [sokoLevel, sokoSublevel, sokoLevel, sokoSublevel])

}

async function getTurns(sokoLevel, sokoSublevel) {
  return await db.query(`
              select s1.user_id,
                     (select username from user where id = s1.user_id) as player,
                     s1.time_seconds,
                     s1.turn_count,
                     s1.soko_path
              from sokoban s1
                       inner join
                   (
                       select user_id, min(turn_count) as min_turn_count
                       from sokoban
                       where soko_level = ?
                         and soko_sublevel = ?
                       group by user_id
                   ) as s2
                   on s1.user_id = s2.user_id
              where s2.min_turn_count = s1.turn_count
                and soko_level = ?
                and soko_sublevel = ?
              order by s2.min_turn_count limit 20;
    `,
    [sokoLevel, sokoSublevel, sokoLevel, sokoSublevel]);
}

module.exports = {
  updateSokoban,
  getTime,
  getTurns
}