const db = require('./db.service')

async function verify(req, issuer, userId, profile, accessToken, refreshToken, params, cb) {
  process.nextTick(async function () {
    try {
      const user = await db.query("SELECT * FROM streamer where username = ?;", [userId.username]);
      if (user.length > 0) {
        return cb(null, user[0])
      } else {
        const newUser = {
          username: userId.username,
          twitchId: userId.id,
          accessToken
        }
        await db.query("INSERT INTO streamer (username, twitch_id, access_token) values (?, ?, ?);",
          [userId.username, userId.id, accessToken]);
        return cb(null, newUser);
      }
    } catch (err) {
      return cb(err);
    }
  });
}

async function verifyByAccessToken(accessToken, cb) {
  process.nextTick(async function () {
    try {
      const user = await db.query("SELECT * FROM streamer where access_token = ?;", [accessToken]);
      if (user.length > 0) {
        return cb(null, user[0])
      } else {
        return cb(null, false)
      }
    } catch (err) {
      return cb(err);
    }
  });
}


async function serializeUser(user, done) {
  process.nextTick(function () {
    // verify has been run
    done(null, user.username);
  })
}

async function deserializeUser(username, done) {
  process.nextTick(async function () {
    try {
      const user = await db.query("SELECT * from streamer where username = ?;", [username]);
      done(null, user[0]);
    } catch (err) {
      return done(null, err);
    }
  });
}

module.exports = {
  verify,
  verifyByAccessToken,
  serializeUser,
  deserializeUser
}