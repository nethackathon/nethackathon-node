const express = require('express');
const router = express.Router();
const baseController = require('../controllers/base.controller');
const livelogOnly = !!process.env.LIVELOG_ONLY

router.get('/livelog', baseController.getHardfoughtLiveLog);

router.get('/endedGames', baseController.getEndedGames);

if (!livelogOnly) {
  router.get('/tagline', baseController.getTagline);

  router.get('/streamers', baseController.getStreamers);

  router.get('/streamers/schedule', baseController.getStreamersSchedule);

  router.get('/schedule', baseController.getSchedule);
}

module.exports = router;
