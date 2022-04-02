function verifyToken(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send('Please log in with Twitch.');
  return next()
}

module.exports = verifyToken
