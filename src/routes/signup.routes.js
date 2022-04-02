const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller');
const twitchAuth = require('../middleware/twitchAuth');

router.get('/', twitchAuth, signupController.get);

router.post('/schedule', twitchAuth, signupController.updateSchedule);

router.post('/text', twitchAuth, signupController.updateText);

module.exports = router;