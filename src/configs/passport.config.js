const baseUri = `${process.env.OIDC_BASE_URI}`

const passportConfig = {
  issuer: baseUri,
  clientID: process.env.TWITCH_CLIENT_ID,
  clientSecret: process.env.TWITCH_CLIENT_SECRET,
  authorizationURL: `${baseUri}/authorize`,
  userInfoURL: `${baseUri}/userinfo`,
  tokenURL: `${baseUri}/token`,
  callbackURL: process.env.OIDC_REDIRECT_URI,
  passReqToCallback: true,
  scope: ['openid', 'profile']
};

module.exports = passportConfig;