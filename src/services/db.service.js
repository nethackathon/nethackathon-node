const mysql = require('mysql2');
const dbConfig = require('../configs/db.config');
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

async function query(sql, params) {
  const [rows, ] = await promisePool.execute(sql, params);
  return rows;
}

async function transactQueries(queries) {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    const results = await Promise.all(
      queries.map(q => connection.execute(q.sql, q.params))
    );
    await connection.commit();
    return results.map(([rows]) => rows);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  query,
  transactQueries,
}