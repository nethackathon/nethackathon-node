const db = require('./db.service');
const jwt = require('jsonwebtoken');

function createToken(username) {
  return jwt.sign(
    { username },
    process.env.TOKEN_KEY,
    {
      expiresIn: "30d",
    }
  );
}

async function login(username, passwordCharacter, passwordColor) {
  const rows = await db.query(
    `select id from user where username = ? AND password_character = ? AND password_color = ?`, 
    [username, passwordCharacter, passwordColor]);
  let invalidCredentials = (rows.length === 0);
  let token = '';
  
  if (!invalidCredentials) {
    let userId = rows[0]['id'];
    token = createToken(username);
    await db.query('update user set token = ? where id = ?', [token, userId]);
  }
  return { invalidCredentials, token };
}

async function register(username, passwordCharacter, passwordColor) {
  const count = await db.query(`select count(*) as username_count from user where username = ?;`, [username]);
  let userExists = (count > 0);
  let token = '';
  
  if (!userExists) {
    token = createToken(username);
    await db.query(
      'insert into user (username, password_color, password_character, token) values (?, ?, ?, ?);',
      [
        username,
        passwordColor,
        passwordCharacter,
        token
      ]);
  }
  return { userExists, token };
}

module.exports = {
  login,
  register
}