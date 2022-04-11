const db = require('./db.service')
const defaultServerData = require('../configs/annotate.config')

async function getData(username) {
  const rows = await db.query(`select data from annotate where user_id = (select id from user where username = ? limit 1);`, 
    [username]);
  if (rows.length === 0) {
    await db.query(`insert into annotate (user_id, data) values ((select id from user where username = ? limit 1), ?);`, 
      [username, JSON.stringify(defaultServerData)]);
    return defaultServerData;
  }
  return rows[0]['data'];
}

async function updateData(username, data) {
  await db.query(`update annotate set data = ? where user_id = (select id from user where username = ? limit 1);`,
    [data, username]);
  return data;
}

async function deleteData(username) {
  const defaultData = JSON.stringify(defaultServerData);
  
  await db.query(`update annotate set data = ? where user_id = (select id from user where username = ?);`,
      [defaultData, username]);
  
  return defaultData;
}

module.exports = {
  getData,
  updateData,
  deleteData
}