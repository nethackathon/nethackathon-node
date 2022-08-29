const express = require('express');
const router = express.Router();
const passport = require('passport');

const isDev = (process.env.MODE === 'DEV')
const appBaseUri = (isDev) ? 'http://localhost:8080' : 'https://nethackathon.org'
const electronReturnUri = (isDev) ? 'http://localhost:8080' : 'http://localhost'

/* signup web app routes */
router.get('/auth', passport.authenticate('web-app-twitch', {
  successReturnToOrRedirect: `${appBaseUri}/sign-up`,
  scope: 'openid'
}));

router.get('/auth/callback', passport.authenticate('web-app-twitch', {
  callback: true,
  successReturnToOrRedirect: `${appBaseUri}/sign-up`,
  failureRedirect: `${appBaseUri}/sign-up`
}));

/* electron app routes */
router.get('/electron', passport.authenticate('electron-twitch', {
  successReturnToOrRedirect: electronReturnUri,
  scope: 'openid'
}));

router.get('/electron/callback', passport.authenticate('electron-twitch', {
  callback: true,
  successReturnToOrRedirect: electronReturnUri,
  failureRedirect: electronReturnUri
}));

module.exports = router;
