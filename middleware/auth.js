const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        return res.status(403).send('JWT token not found')
    }

    try {
        const payload = jwt.verify(token, process.env.TOKEN_KEY)
        req.username = payload.username
    } catch (err) {
        console.log('err', err)
        return res.status(401).send('Invalid JWT token')
    }
    return next()
}

module.exports = verifyToken
