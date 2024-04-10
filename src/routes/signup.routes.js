const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller');
const twitchAuth = require('../middleware/twitchAuth');

router.get('/', twitchAuth, signupController.get);

router.put('/schedule', twitchAuth, signupController.updateSchedule);

router.put('/text', twitchAuth, signupController.updateText);

router.put('/checklist', twitchAuth, signupController.updateChecklist);

router.put('/survey', twitchAuth, signupController.updateSurvey);

router.post('/event-media/create', twitchAuth, signupController.createEventMedia);

router.put('/event-media/update', twitchAuth, signupController.updateEventMedia);

router.get('/event-media/get', twitchAuth, signupController.getEventMedia);

module.exports = router;
