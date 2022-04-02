require('dotenv').config();

/* NPM MODULES */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

const passportService = require('./src/services/passport.service');
const TwitchLoginStrategy = require('passport-openidconnect');

/* CONFIGS */
const corsConfig = require('./src/configs/cors.config');
const sessionConfig = require('./src/configs/session.config');
const passportConfig = require('./src/configs/passport.config');

const app = express();
const port = process.env.PORT || 3000;

/* MIDDLEWARE */
passport.use(new TwitchLoginStrategy(passportConfig, passportService.verify));
passport.serializeUser(passportService.serializeUser);
passport.deserializeUser(passportService.deserializeUser);
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT ROUTES */
const isDev = (process.env.MODE === 'DEV')
const appBaseUri = (isDev) ? 'http://localhost:8080' : 'https://nethackathon.org'

app.get('/twitch/auth', passport.authenticate('openidconnect', {
  successReturnToOrRedirect: `${appBaseUri}/signup`,
  scope: 'openid'
}));

app.get('/twitch/auth/callback', passport.authenticate('openidconnect', {
  callback: true,
  successReturnToOrRedirect: `${appBaseUri}/signup`,
  failureRedirect: `${appBaseUri}/signup`
}));

/* ROUTES */
const baseRouter = require('./src/routes/base.routes');
const annotateRouter = require('./src/routes/annotate.routes');
const loginRouter = require('./src/routes/login.routes');
const invokeRouter = require('./src/routes/invoke.routes');
const signupRouter = require('./src/routes/signup.routes');
const sokobanRouter = require('./src/routes/sokoban.routes');

app.use('/', baseRouter);
app.use('/annotate', annotateRouter);
app.use('/auth', loginRouter);
app.use('/invoke', invokeRouter);
app.use('/signup', signupRouter);
app.use('/sokoban', sokobanRouter);

app.listen(port, async () => {
  console.log(`annotate app listening at https://nethackathon.org:${port}`);
});
