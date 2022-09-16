const db = {
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  socketPath: '/tmp/mysql.sock',
};

module.exports = db;
