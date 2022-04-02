const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sokobanController = require('../controllers/sokoban.controller');

router.post('/', auth, sokobanController.updateSokoban);

router.get('/time/:soko_level/:soko_sublevel', sokobanController.getTime);

router.get('/turns/:soko_level/:soko_sublevel', sokobanController.getTurns);

module.exports = router;