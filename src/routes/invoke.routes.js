const express = require('express');
const router = express.Router();
const invokeController = require('../controllers/invoke.controller');
const twitchAuth = require('../middleware/twitchAuth');

router.get('/adventurer', twitchAuth, invokeController.getAdventurer);

router.post('/adventurer', twitchAuth, invokeController.claimAdventurer);

module.exports = router;