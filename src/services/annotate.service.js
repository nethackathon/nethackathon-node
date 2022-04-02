const db = require('./db.service')

const defaultServerData = { intrinsics: [
    { name: 'Cold', value: false },
    { name: 'Disintegration', value: false },
    { name: 'Fire', value: false },
    { name: 'Infravision', value: false },
    { name: 'Invisible', value: false },
    { name: 'Magic', value: false },
    { name: 'Poison', value: false },
    { name: 'Reflection', value: false },
    { name: 'Searching', value: false },
    { name: 'See Invisible', value: false },
    { name: 'Shock', value: false },
    { name: 'Sleep', value: false },
    { name: 'Speed', value: false },
    { name: 'Stealth', value: false },
    { name: 'Telepathy', value: false },
    { name: 'Teleport Control', value: false },
    { name: 'Teleportitis', value: false },
    { name: 'Warning', value: false },
  ],
  protection: 0,
  canPray: true,
  lastPrayed: undefined,
  notes: '',
  cha: 10,
  touristCapShirt: false
};

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