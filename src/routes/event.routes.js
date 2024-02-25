const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

router.get('/:eventId/streamers', eventController.getStreamersByEventId);
router.get('/:eventId/media', eventController.getMediaByEventId);

module.exports = router;
