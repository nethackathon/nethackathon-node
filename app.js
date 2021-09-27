require('dotenv').config()
const express = require('express')
const auth = require('./middleware/auth')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const connection = mysql.createConnection({
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
    notes: '',
    cha: 10,
    touristCapShirt: false
}

let serverData = Object.assign({}, defaultServerData)

app.get('/annotate', auth, (req, res) => {
    try {
        connection.query(`select data from annotate where user_id = (select id from user where username = ?);`,
            [req.username],
            function (error, results) {
              if (error) throw error;
              if (results.length === 0) {
                  connection.query(`insert into annotate (user_id, data) values ((select id from user where username = ?), ?);`,
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
        connection.query(`update annotate set data = ? where user_id = (select id from user where username = ?);`,
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
    serverData = Object.assign({}, defaultServerData)
    res.send(serverData)
})

app.listen(port, () => {
    console.log(`annotate app listening at https://nethackathon.org:${port}`)
})

app.post('/annotate/register', (req, res) => {
    try {
        const { username, passwordCharacter, passwordColor } = req.body
        if (!(username && passwordCharacter && passwordColor)) {
            res.status(400).send('username, passwordCharacter, and passwordColor are required.')
        }
        connection.query(
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
        connection.query(
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
        connection.query(
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
                connection.query(
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
