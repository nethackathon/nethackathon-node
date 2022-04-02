const sokobanService = require('../services/sokoban.service');

async function updateSokoban(req, res, next) {
  try {
      res.json(await sokobanService.updateSokoban(req.username, req.body.turn_count, req.body.time_seconds,
        req.body.soko_level, req.body.soko_sublevel, JSON.stringify(req.body.soko_path)));
  } catch (err) {
    console.error('Error in sokoban.controller updateSokoban.', err.message);
    next(err);
  }
}

async function getTime(req, res, next) {
  try {
    let sokoLevel = req.params.soko_level;
    let sokoSublevel = req.params.soko_sublevel;
    res.json(await sokobanService.getTime(sokoLevel, sokoSublevel));
  } catch (err) {
    console.error('Error in sokoban.controller getTime.', err.message);
    next(err);
  }
}

async function getTurns(req, res, next) {
  try {
    let sokoLevel = req.params.soko_level;
    let sokoSublevel = req.params.soko_sublevel;
    res.json(await sokobanService.getTurns(sokoLevel, sokoSublevel));
  } catch (err) {
    console.error('Error in sokoban.controller getTurns.', err.message);
    next(err);
  }
}

module.exports = {
  updateSokoban,
  getTime,
  getTurns
}