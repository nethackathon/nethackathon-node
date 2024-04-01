const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

router.get('/current', eventController.getCurrentEvent);
router.get('/current/schedule', eventController.getCurrentEventSchedule);
router.get('/:eventId', eventController.getEventById);
router.get('/:eventId/streamers', eventController.getStreamersByEventId);
router.get('/:eventId/media', eventController.getMediaByEventId);

module.exports = router;
