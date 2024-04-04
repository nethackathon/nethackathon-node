const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charity.controller');

router.get('/progress', charityController.getCharityProgress);

module.exports = router;
