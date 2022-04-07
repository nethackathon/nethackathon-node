const express = require('express');
const router = express.Router();
const passport = require('passport');

const isDev = (process.env.MODE === 'DEV')
const appBaseUri = (isDev) ? 'http://localhost:8080' : 'https://nethackathon.org'

/* signup web app routes */
router.get('/auth', passport.authenticate('web-app-twitch', {
  successReturnToOrRedirect: `${appBaseUri}/signup`,
  scope: 'openid'
}));

router.get('/auth/callback', passport.authenticate('web-app-twitch', {
  callback: true,
  successReturnToOrRedirect: `${appBaseUri}/signup`,
  failureRedirect: `${appBaseUri}/signup`
}));

/* electron app routes */
router.get('/electron', passport.authenticate('electron-twitch', {
  successReturnToOrRedirect: `http://localhost:8080/`,
  scope: 'openid'
}));

router.get('/electron/callback', passport.authenticate('electron-twitch', {
  callback: true,
  successReturnToOrRedirect: `http://localhost:8080/`,
  failureRedirect: `http://localhost:8080/`
}));

module.exports = router;