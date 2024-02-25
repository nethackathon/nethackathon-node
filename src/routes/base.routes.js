const express = require('express');
const router = express.Router();
const baseController = require('../controllers/base.controller');
const eventController = require('../controllers/event.controller');
const livelogOnly = !!process.env.LIVELOG_ONLY

router.get('/livelog', baseController.getHardfoughtLiveLog);

router.get('/endedGames', baseController.getHardfoughtEndedGames);

if (!livelogOnly) {
  router.get('/tagline', baseController.getTagline);

  router.get('/streamers', baseController.getStreamers);

  router.get('/streamers/schedule', baseController.getStreamersSchedule);

  router.get('/schedule', baseController.getSchedule);
}

router.get('/events', eventController.getEvents);

module.exports = router;
