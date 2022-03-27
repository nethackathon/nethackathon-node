require('dotenv').config();

const port = 3000
const isDev = false

const appBaseUri = (isDev) ? 'http://localhost:8080' : 'https://nethackathon.org'

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('passport');
const TwitchLoginStrategy = require('passport-openidconnect').Strategy

const auth = require('./middleware/auth')

const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})
const jwt = require('jsonwebtoken')
const cors = require('cors')

const baseUri = `${process.env.OIDC_BASE_URI}`
passport.use(new TwitchLoginStrategy({
    issuer: baseUri,
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    authorizationURL: `${baseUri}/authorize`,
    userInfoURL: `${baseUri}/userinfo`,
    tokenURL: `${baseUri}/token`,
    callbackURL: process.env.OIDC_REDIRECT_URI,
    passReqToCallback: true,
    scope: ['openid', 'profile']
  },
  function(req, issuer, userId, profile, accessToken, refreshToken, params, cb) {
    process.nextTick(function () {
      pool.query("SELECT * FROM streamer where username = ?", [userId.username], (err, user) => {
        if (err) {
          console.log('error in passport verify, SELECT * FROM streamer where', err);
          return cb(err);
        } else if (user.length > 0) {
          return cb(null, user[0])
        } else {
          // new user
          const newUser = {
            username: userId.username,
            twitchId: userId.id,
            accessToken
          }
          pool.query("INSERT INTO streamer (username, twitch_id, access_token) values (?, ?, ?)",
            [userId.username, userId.id, accessToken], (err, rows) => {
            if (err) {
              console.log('error in passport verify, INSERT INTO streamer', err)
            }
            return cb(null, newUser)
          })
        }
      })
    });
  }));

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    // verify has been run
    done(null, user.username);
  })
});

passport.deserializeUser(function(username, done) {
  process.nextTick(function() {
    pool.query("SELECT * from streamer where username = ?", [username], (err, user) => {
      if (err) {
        console.log('error in deserializeUser, SELECT * from streamer', err);
        return done(null, err);
      }
      done(null, user[0]);
    })
  })
});

const app = express()

app.use(logger('dev'));
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());



// NetHackathon Signup
app.get('/signup/schedule', (req, res) => {
  if (req.isAuthenticated()) {
    pool.query("SELECT schedule, discord_username, notes from streamer where username = ?", [req.user.username], (err, record) => {
      if (err) {
        console.log('error in GET: /signup/schedule, SELECT schedule...', err);
        return res.status(500).send('Something went wrong.')
      }
      const response = {
        schedule: (record && record[0] && record[0].schedule) ? JSON.parse(record[0].schedule) : [],
        discordUsername: (record && record[0] && record[0].discord_username) ? record[0].discord_username : '',
        notes: (record && record[0] && record[0].notes) ? record[0].notes : '',
        username: req.user.username
      }
      res.json(response)
    })
  } else {
    res.status(401).send('Please log in with Twitch.')
  }
})

app.post('/signup/schedule', (req, res) => {
  if (req.isAuthenticated()) {
    pool.query("UPDATE streamer set schedule = ? where username = ?", [JSON.stringify(req.body), req.user.username], (err, user) => {
      if (err) {
        console.log('error in POST: /signup/schedule, UPDATE streamer set schedule...', err);
        return res.status(500).send('Something went wrong.')
      }
      return res.status(200).send()
    })
  } else {
    res.status(401).send('Please log in with Twitch.')
  }
})

app.post('/signup/text', (req, res) => {
  if (req.isAuthenticated()) {
    pool.query("UPDATE streamer set notes = ?, discord_username = ? where username = ?", [req.body.notes, req.body.discordUsername, req.user.username], (err, rows) => {
      if (err) {
        console.log('error in POST: /signup/text UPDATE streamer set notes...', err);
        return res.status(500).send('Something went wrong.')
      }
      return res.status(200).send()
    })
  } else {
    res.status(401).send('Please log in with Twitch.')
  }
})

app.get('/signup/auth', passport.authenticate('openidconnect', {
  successReturnToOrRedirect: `${appBaseUri}/signup`,
  scope: 'openid'
}));

app.get('/signup/auth/callback', passport.authenticate('openidconnect', {
  callback: true,
  successReturnToOrRedirect: `${appBaseUri}/signup`,
  failureRedirect: `${appBaseUri}/signup`
}));

app.get('/streamers', (req, res) => {
  pool.query("SELECT username from streamer where length(schedule) > 2", (err, records) => {
    if (err) {
      console.log('error in GET: /streamers, SELECT username...', err);
      return res.status(500).send('Something went wrong.')
    }
    const response = {
      streamers: records
    }
    res.json(response)
  })
})


/* ANNOTATE ROUTES */
const defaultServerData = {
  intrinsics: [
    { name: 'Cold', value: false },
    { name: 'Disintegration', value: false },
    { name: 'Fire', value: false },
    { name: 'Infravision', value: false },
    { name: 'Invisible', value: false },
    { name: 'Magic', value: false },
    { name: 'Poison', value: false },
    { name: 'Reflection', value: false },
    { name: 'Searching', value: false },
    { name: 'See Invisible', value: false },
    { name: 'Shock', value: false },
    { name: 'Sleep', value: false },
    { name: 'Speed', value: false },
    { name: 'Stealth', value: false },
    { name: 'Telepathy', value: false },
    { name: 'Teleport Control', value: false },
    { name: 'Teleportitis', value: false },
    { name: 'Warning', value: false },
  ],
  protection: 0,
  canPray: true,
  lastPrayed: undefined,
  notes: '',
  cha: 10,
  touristCapShirt: false
}


app.get('/annotate-api', auth, (req, res) => {
  try {
    pool.query(`select data from annotate where user_id = (select id from user where username = ?);`,
      [req.username],
      function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
          pool.query(`insert into annotate (user_id, data) values ((select id from user where username = ?), ?);`,
            [req.username, JSON.stringify(defaultServerData)],
            function (error) {
              if (error) throw error;
              res.send(defaultServerData)
            })
        } else {
          res.send(results[0]['data'])
        }
      })

  } catch (err) {
    console.log('error in GET: /annotate-api', err)
    res.status(500).send('Something went wrong!')
  }
})

app.post('/annotate-api', auth, (req, res) => {
  try {
    pool.query(`update annotate set data = ? where user_id = (select id from user where username = ?);`,
      [JSON.stringify(req.body), req.username],
      function (error, results) {
        if (error) throw error;
        res.send(req.body)
      })

  } catch (err) {
    console.log('error in POST: /annotate-api', err)
    res.status(500).send('Something went wrong!')
  }
})

app.delete('/annotate-api', auth, (req, res) => {
  try {
    pool.query(`update annotate set data = ? where user_id = (select id from user where username = ?);`,
      [JSON.stringify(defaultServerData), req.username],
      function (error, results) {
        if (error) throw error;
        res.send(defaultServerData)
      })

  } catch (err) {
    console.log('error in DELETE: /annotate-api', err)
    res.status(500).send('Something went wrong!')
  }
})

app.post('/annotate-api/sokoban', auth, (req, res) => {
  try {
    pool.query(`insert into sokoban (user_id, turn_count, time_seconds, soko_level, soko_sublevel, soko_path) 
          values ( (select id from user where username = ? limit 1), ?, ?, ?, ?, ?);`,
      [req.username, req.body.turn_count, req.body.time_seconds, req.body.soko_level, req.body.soko_sublevel, JSON.stringify(req.body.soko_path)],
      function (error, results) {
        if (error) throw error;
        res.send(req.body)
      })

  } catch (err) {
    res.status(500).send('Something went wrong!')
    console.log(err)
  }
})

app.get('/annotate-api/sokoban/time/:soko_level/:soko_sublevel', (req, res) => {
  let soko_level = req.params.soko_level
  let soko_sublevel = req.params.soko_sublevel
  try {
    pool.query(`
                    select s1.user_id, (select username from user where id = s1.user_id) as player, s1.time_seconds, s1.turn_count, s1.soko_path from sokoban s1 inner join
                      (
                          select user_id, min(time_seconds) as min_time_seconds
                          from sokoban
                          where soko_level = ? and soko_sublevel = ?
                          group by user_id
                      ) as s2
                      on s1.user_id = s2.user_id
                    where s2.min_time_seconds = s1.time_seconds
                      and soko_level = ? and soko_sublevel = ?
                    order by s2.min_time_seconds
                        limit 20;
            `,
      [soko_level, soko_sublevel, soko_level, soko_sublevel],
      function (error, results) {
        if (error) throw error;
        res.send(results)
      })

  } catch (err) {
    res.status(500).send('Something went wrong!')
    console.log(err)
  }
})

app.get('/annotate-api/sokoban/turns/:soko_level/:soko_sublevel', (req, res) => {
  let soko_level = req.params.soko_level
  let soko_sublevel = req.params.soko_sublevel
  try {
    pool.query(`
                    select s1.user_id, (select username from user where id = s1.user_id) as player, s1.time_seconds, s1.turn_count, s1.soko_path from sokoban s1 inner join
                      (
                          select user_id, min(turn_count) as min_turn_count
                          from sokoban
                          where soko_level = ? and soko_sublevel = ?
                          group by user_id
                      ) as s2
                      on s1.user_id = s2.user_id
                    where s2.min_turn_count = s1.turn_count
                      and soko_level = ? and soko_sublevel = ?
                    order by s2.min_turn_count
                        limit 20;
        `,
      [soko_level, soko_sublevel, soko_level, soko_sublevel],
      function (error, results) {
        if (error) throw error;
        res.send(results)
      })

  } catch (err) {
    res.status(500).send('Something went wrong!')
    console.log(err)
  }
})

app.post('/annotate-api/register', (req, res) => {
  try {
    const { username, passwordCharacter, passwordColor } = req.body
    if (!(username && passwordCharacter && passwordColor)) {
      res.status(400).send('username, passwordCharacter, and passwordColor are required.')
    }
    pool.query(
      `select count(*) as username_count from user where username = ?;`, [username],
      function (error, results) {
        if (error) throw error;
        if (results[0]['username_count'] > 0) {
          res.status(409).send('User already exists.')
        }
      }
    )
    const token = jwt.sign(
      { username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    )
    pool.query(
      'insert into user set ?',
      {
        username,
        password_color: passwordColor,
        password_character: passwordCharacter,
        token
      },
      function (error) {
        if (error) throw error;
      }
    )
    res.status(201).json(token);
  } catch (err) {
    res.status(500).send('Something went wrong!')
    console.log(err)
  }
})

app.post('/annotate-api/login', (req, res) => {
  try {
    const { username, passwordCharacter, passwordColor } = req.body
    if (!(username && passwordCharacter && passwordColor)) {
      res.status(400).send('username, passwordCharacter, and passwordColor are required.')
    }
    pool.query(
      `select id from user where username = ? AND password_character = ? AND password_color = ?`, [username, passwordCharacter, passwordColor],
      function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
          return res.status(400).send('Invalid credentials.')
        }
        let userId = results[0]['id']
        const token = jwt.sign(
          { username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "30d",
          }
        )
        pool.query(
          'update user set token = ? where id = ?', [token, userId],
          function (error) {
            if (error) throw error;
            return res.status(201).json(token);
          }
        )
      }
    )
  } catch (err) {
    res.status(500).send('Something went wrong!')
    console.log(err)
  }
})

app.listen(port, async () => {
  console.log(`annotate app listening at https://nethackathon.org:${port}`)
})
