const express = require('express');
const router = express.Router();
const streamerController = require('../controllers/streamer.controller');
const twitchAuth = require('../middleware/twitchAuth');

router.get('/', twitchAuth, streamerController.get);

router.post('/', twitchAuth, streamerController.update);

router.get('/eggs', twitchAuth, streamerController.getEggs);

router.post('/achievement', twitchAuth, streamerController.updateAchievement);

module.exports = router;