require('dotenv').config()
const express = require('express')
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
const cookieParser = require('cookie-parser')
const app = express()
const { errors, generators, Issuer } = require('openid-client')
let twitchIssuer, twitchOAuthClient

app.use(cors())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())

const port = 3000

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

let serverData = Object.assign({}, defaultServerData)

// NetHackathon Signup
app.get("/signup/schedule", (req, res) => {
  try {
    const loginCookie = req.signedCookies['nethackathon_signup_login']
    if (loginCookie === undefined) {
      res.status(401).send('Please log in with Twitch.')
    } else {
      console.log('signed in')
      console.log(req.signedCookies['nethackathon_signup_login'])
    }
  } catch (err) {
    res.status(500).send('Something went wrong!')
    console.log(err)
  }
})

app.get("/signup/auth", (req, res) => {
  try {
    console.log('generating code_verifier')
    const code_verifier = generators.codeVerifier()
    console.log('setting code_verifier cookie')
    res.cookie("nethackathon_code_verifier", JSON.stringify({code_verifier}), {
      secure: false,
      httpOnly: true,
      signed: true
    })
    console.log('generating code_challenge')
    const code_challenge = generators.codeChallenge(code_verifier)
    console.log('getting auth url')
    const authURL = twitchOAuthClient.authorizationUrl({
      redirect_uri: 'http://localhost:3000/signup/auth/callback',
      scope: 'openid',
      code_challenge,
      code_challenge_method: 'S256',
    })
    console.log('redirecting to authURL', authURL)
    res.redirect(authURL)
  } catch (err) {
    res.status(500).send('Something went wrong!')
    console.log(err)
  }
})

app.get("/signup/auth/callback", async (req, res) => {
  try {
    const params = twitchOAuthClient.callbackParams(req)
    console.log('params', params)
    console.log('cookies', req.cookies)
    console.log('signedCookies', req.signedCookies)
    const code_verifier = JSON.parse(req.signedCookies.nethackathon_code_verifier).code_verifier
    console.log('code_verifier', code_verifier)
    try {
      let tokenSet = await twitchOAuthClient.callback('http://localhost:3000/signup/auth/callback', params, { code_verifier })
      console.log('tokenSet', tokenSet)

      const userinfo = await twitchOAuthClient.userinfo(tokenSet.access_token);
      console.log('userinfo %j', userinfo);

      tokenSet = await twitchOAuthClient.refresh(tokenSet);
      console.log('refreshed and validated tokens %j', tokenSet);
      console.log('refreshed ID Token claims %j', tokenSet.claims());

      res.redirect('http://localhost:8080/signup')
    } catch (err) {
      console.log('err', err)
      console.log('err.response.data', err?.response?.data)
      console.log('err.response.status', err?.response?.status)
      console.log('err.response.headers', err?.response?.headers)
    }
    /*
    const userInfo = await twitchOAuthClient.userinfo(tokenSet)
    console.log('userInfo', userInfo)
     */
  } catch (err) {
    res.status(500).send('Something went wrong!')
    console.log(err)
  }
})

app.get('signup/schedule', (req, res) => {
  if (!req.signedCookies.hasOwnProperty('nethackathon_signup_login')) res.status(401).send('Please login.')

  jwt.verify(req.signedCookies.nethackathon_signup_login, (err, decoded) => {
    if (err) res.status(403).send('Invalid token.')
    res.status(200).send('logged in as ' + decoded.preferred_username)
  })
})

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
        res.status(500).send('Something went wrong!')
        console.log(err)
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
        res.status(500).send('Something went wrong!')
        console.log(err)
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
        res.status(500).send('Something went wrong!')
        console.log(err)
    }
})

app.listen(port, async () => {
    console.log(`annotate app listening at https://nethackathon.org:${port}`)
    twitchIssuer = await Issuer.discover('https://id.twitch.tv/oauth2')
    twitchOAuthClient = new twitchIssuer.Client({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      redirect_uris: ['http://localhost:3000/signup/auth/callback', 'http://localhost:8080/signup'],
      response_types: ['code']
    })
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
