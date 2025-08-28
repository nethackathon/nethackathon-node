const express = require('express');
const router = express.Router();
const passport = require('passport');

const isDev = (process.env.MODE === 'DEV')
const appBaseUri = (isDev) ? 'http://localhost:4321' : 'https://nethackathon.org'
const electronReturnUri = (isDev) ? 'http://localhost:8080' : 'http://localhost'

const allowedRedirectUris = [
  'http://localhost:4321',
  'https://nethackathon.org',
];

function validateRedirectUri(uri) {
  try {
    const url = new URL(uri);
    
    if (!allowedRedirectUris.includes(uri)) {
      return false;
    }
    
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return false;
    }
    
    if (url.hostname !== 'localhost' && url.hostname !== 'nethackathon.org') {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

/* signup web app routes */
router.get('/auth', (req, res, next) => {
  const { redirectUri } = req.query;
  let finalRedirectUri = `${appBaseUri}/sign-up`; // default
  
  // If redirectUri is provided and valid, use it
  if (redirectUri && validateRedirectUri(redirectUri)) {
    finalRedirectUri = `${redirectUri}/sign-up`;
  }
  
  // Store the redirect URI in session for use in callback
  req.session.customRedirectUri = finalRedirectUri;
  
  passport.authenticate('web-app-twitch', {
    successReturnToOrRedirect: finalRedirectUri,
    scope: 'openid'
  })(req, res, next);
});

router.get('/auth/callback', (req, res, next) => {
  // Get the stored redirect URI from session
  const customRedirectUri = req.session.customRedirectUri || `${appBaseUri}/sign-up`;
  
  passport.authenticate('web-app-twitch', {
    callback: true,
    successReturnToOrRedirect: customRedirectUri,
    failureRedirect: customRedirectUri
  })(req, res, next);
});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(`${appBaseUri}/sign-up`);
  });
});

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
