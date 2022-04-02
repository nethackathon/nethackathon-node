const loginService = require('../services/login.service');

async function login(req, res, next) {
  try {
    const { username, passwordCharacter, passwordColor } = req.body
    if (!(username && passwordCharacter && passwordColor)) {
      res.status(400).send('username, passwordCharacter, and passwordColor are required.');
    }
    const { invalidCredentials, token } = await loginService.login(username, passwordCharacter, passwordColor);
    if (invalidCredentials) res.status(400).send('Invalid credentials.');
    res.status(200).json(token);
  } catch (err) {
    console.error('Error in login.controller login.', err.message);
    next(err);
  }
}

async function register(req, res, next) {
  try {
    const { username, passwordCharacter, passwordColor } = req.body;
    if (!(username && passwordCharacter && passwordColor)) {
      res.status(400).send('username, passwordCharacter, and passwordColor are required.');
    }
    const { userExists, token } = res.json(await loginService.register(username, passwordCharacter, passwordColor));
    if (userExists) res.status(409).send('User already exists.');
    res.status(201).json(token);
  } catch (err) {
    console.error('Error in login.controller register.', err.message);
    next(err);
  }
}

module.exports = {
  login,
  register
}