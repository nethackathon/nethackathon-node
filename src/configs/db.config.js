const db = {
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  timezone: 'Z',
  socketPath: '/var/run/mysqld/mysqld.sock',
};

module.exports = db;
