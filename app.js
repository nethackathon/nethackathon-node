const path = require('path');
require('dotenv').config({path: '.env'});

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
const BearerTokenStrategy = require('passport-http-bearer').Strategy;

/* CONFIGS */
const corsConfig = require('./src/configs/cors.config');
const sessionConfig = require('./src/configs/session.config');
const {webAppConfig, electronConfig} = require('./src/configs/passport.config');

const app = express();
const port = process.env.PORT || 3000;

/* MIDDLEWARE */
app.use(session(sessionConfig));
passport.use('bearer-token', new BearerTokenStrategy(passportService.verifyByAccessToken));
passport.use('web-app-twitch', new TwitchLoginStrategy(webAppConfig, passportService.verify));
passport.use('electron-twitch', new TwitchLoginStrategy(electronConfig, passportService.verify));
passport.serializeUser(passportService.serializeUser);
passport.deserializeUser(passportService.deserializeUser);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ROUTES */
const baseRouter = require('./src/routes/base.routes');
const annotateRouter = require('./src/routes/annotate.routes');
const loginRouter = require('./src/routes/login.routes');
const signupRouter = require('./src/routes/signup.routes');
const streamerRouter = require('./src/routes/streamer.routes');
const sokobanRouter = require('./src/routes/sokoban.routes');
const twitchRouter = require('./src/routes/twitch.routes');
const eventRouter = require('./src/routes/event.routes');
const charityRouter = require('./src/routes/charity.routes');

app.use('/', baseRouter);
app.use('/annotate', annotateRouter);
app.use('/auth', loginRouter);
app.use('/signup', signupRouter);
app.use('/streamer', streamerRouter);
app.use('/sokoban', sokobanRouter);
app.use('/twitch', twitchRouter);
app.use('/event', eventRouter);
app.use('/charity', charityRouter);

app.listen(port, async () => {
  console.log(`annotate app listening at https://nethackathon.org:${port}`);
});
