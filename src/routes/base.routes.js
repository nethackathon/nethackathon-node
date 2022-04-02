const express = require('express');
const router = express.Router();
const baseController = require('../controllers/base.controller');

router.get('/tagline', baseController.getTagline);

router.get('/streamers', baseController.getStreamers);

router.get('/streamers/schedule', baseController.getStreamersSchedule);

module.exports = router;