const express = require('express');
const router = express.Router();
const baseController = require('../controllers/base.controller');

// router.get('/tagline', baseController.getTagline);

// router.get('/streamers', baseController.getStreamers);

// router.get('/streamers/schedule', baseController.getStreamersSchedule);

router.get('/livelog', baseController.getLiveLog);

router.get('/endedGames', baseController.getEndedGames);

// router.get('/schedule', baseController.getSchedule);

module.exports = router;