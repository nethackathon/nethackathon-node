const express = require('express')
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
    notes: ''
}

let serverData = Object.assign({}, defaultServerData)

app.get('/annotate', (req, res) => {
    res.send(serverData)
})

app.post('/annotate', (req, res) => {
    serverData = JSON.parse(JSON.stringify(req.body))
    res.send(serverData)
})

app.delete('/annotate', (req, res) => {
    serverData = Object.assign({}, defaultServerData)
    res.send(serverData)
})

app.listen(port, () => {
    console.log(`annotate app listening at https://nethackathon.org:${port}`)
})
