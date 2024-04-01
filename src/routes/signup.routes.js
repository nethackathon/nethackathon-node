const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller');
const twitchAuth = require('../middleware/twitchAuth');

router.get('/', twitchAuth, signupController.get);

router.put('/schedule', twitchAuth, signupController.updateSchedule);

router.put('/text', twitchAuth, signupController.updateText);

router.put('/checklist', twitchAuth, signupController.updateChecklist);

module.exports = router;
