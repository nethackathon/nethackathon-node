require('dotenv').config()
const express = require('express')
const auth = require('./middleware/auth')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})
const cors = require('cors')
const app = express()

app.use(cors())
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

app.get('/annotate', auth, (req, res) => {
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

app.post('/annotate', auth, (req, res) => {
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

app.delete('/annotate', auth, (req, res) => {
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

app.listen(port, () => {
    console.log(`annotate app listening at https://nethackathon.org:${port}`)
})

app.post('/annotate/sokoban', auth, (req, res) => {
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

app.get('/annotate/sokoban/time/:soko_level/:soko_sublevel', (req, res) => {
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

app.get('/annotate/sokoban/turns/:soko_level/:soko_sublevel', (req, res) => {
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

app.post('/annotate/register', (req, res) => {
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

app.post('/annotate/login', (req, res) => {
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
