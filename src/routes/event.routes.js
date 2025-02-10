const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const twitchAuth = require('../middleware/twitchAuth');
const adminMiddleware = require('../middleware/admin');

router.get('/last', eventController.getLastEvent);
router.get('/current', eventController.getCurrentEvent);
router.get('/current/schedule', eventController.getCurrentEventSchedule);
router.get('/:eventId', eventController.getEventById);
router.get('/:eventId/streamers', eventController.getStreamersByEventId);
router.get('/:eventId/schedule', eventController.getScheduleByEventId);
router.get('/:eventId/media', eventController.getMediaByEventId);

router.post('/', twitchAuth, adminMiddleware, eventController.createEvent);
router.patch('/', twitchAuth, adminMiddleware, eventController.updateEvent);

module.exports = router;
