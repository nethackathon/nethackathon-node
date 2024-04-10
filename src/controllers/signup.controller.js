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

async function updateSurvey(req, res, next) {
  try {
    res.json(await signupService.updateSurvey(req.user.username, JSON.stringify(req.body)));
  } catch (err) {
    console.error('Error in signup.controller updateSurvey.', err.message);
    next(err);
  }
}

async function createEventMedia(req, res, next) {
  try {
    await signupService.createEventMedia(
      req.user.username,
      req.body.eventId,
      req.body.mediaType,
      req.body.videoType,
      req.body.platform,
      req.body.mediaUrl,
      req.body.thumbnailUrl,
      req.body.title,
      req.body.description,
      req.body.startTime,
      req.body.endTime
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('Error in signup.controller createEventMedia.', err.message);
    next(err);
  }
}

async function updateEventMedia(req, res, next) {
  try {
    await signupService.updateEventMedia(
      req.body.eventMediaId,
      req.body.mediaType,
      req.body.videoType,
      req.body.platform,
      req.body.mediaUrl,
      req.body.thumbnailUrl,
      req.body.title,
      req.body.description,
      req.body.startTime,
      req.body.endTime
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('Error in signup.controller updateEventMedia.', err.message);
    next(err);
  }
}

async function getEventMedia(req, res, next) {
  try {
    res.json(await signupService.getEventMedia(req.user.username));
  } catch (err) {
    console.error('Error in signup.controller getEventMedia.', err.message);
    next(err);
  }
}

module.exports = {
  createEventMedia,
  get,
  getEventMedia,
  updateEventMedia,
  updateSchedule,
  updateText,
  updateChecklist,
  updateSurvey,
}
