const express = require('express');
const passport = require('passport');
const router = express.Router();
const invokeController = require('../controllers/invoke.controller');
const twitchAuth = require('../middleware/twitchAuth');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'saves'),
  filename: function (req, file, cb) {
    const claimee = req.user.username;
    cb(null, `${claimee}_${new Date().getTime()}.tgz`)
  }
});

const upload = multer({storage: storage, limits: { fieldSize: 100 * 1024 * 1024 } });

router.get('/', twitchAuth, invokeController.get);

/* Character claiming routes */
router.get('/adventurer', twitchAuth, invokeController.getAdventurer);

router.post('/adventurer', twitchAuth, invokeController.claimAdventurer);

router.post('/releaseAdventurer', twitchAuth, invokeController.releaseAdventurer);

router.post('/uploadSave', [passport.authenticate('bearer-token', { session: false }), upload.single('file')], invokeController.uploadSave);

router.post('/downloadSave', passport.authenticate('bearer-token', { session: false }), invokeController.downloadSave);

module.exports = router;
