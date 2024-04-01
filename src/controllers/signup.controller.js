const signupService = require('../services/signup.service');

async function get(req, res, next) {
  try {
    res.json(await signupService.get(req.user.username));
  } catch (err) {
    console.error('Error in signup.controller get.', err.message);
    next(err);
  }
}

async function updateSchedule(req, res, next) {
  try {
    res.json(await signupService.updateSchedule(req.user.username, JSON.stringify(req.body)));
  } catch (err) {
    console.error('Error in signup.controller updateSchedule.', err.message);
    next(err);
  }
}

async function updateText(req, res, next) {
  try {
    res.json(await signupService.updateText(req.user.username, req.body.notes, req.body.discordUsername, req.body.pronouns, req.body.slotLength));
  } catch (err) {
    console.error('Error in sokoban.controller getTurns.', err.message);
    next(err);
  }
}

async function updateChecklist(req, res, next) {
  try {
    res.json(await signupService.updateChecklist(req.user.username, JSON.stringify(req.body)));
  } catch (err) {
    console.error('Error in signup.controller updateChecklist.', err.message);
    next(err);
  }
}

module.exports = {
  get,
  updateSchedule,
  updateText,
  updateChecklist,
}
