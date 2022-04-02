const mysql = require('mysql2');
const dbConfig = require('../configs/db.config');
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

async function query(sql, params) {
  const [rows, ] = await promisePool.execute(sql, params);
  return rows;
}

module.exports = {
  query,
}