const annotateService = require('../services/annotate.service');
const streamerService = require('../services/streamer.service');

async function get(req, res, next) {
  try {
    const returnData = await annotateService.getData('nethackathon')
    res.json({...returnData, username: req.user.username});
  } catch (err) {
    console.error('Error in streamer.controller get.', err.message);
    next(err);
  }
}

async function getEggs(req, res, next) {
  try {
    const returnData = await streamerService.getEggs()
    res.json(returnData);
  } catch (err) {
    console.error('Error in streamer.controller get.', err.message);
    next(err);
  }
}

async function updateAchievement(req, res, next) {
  try {
    const name = req.body['name']
    const username = req.user.username
    await streamerService.updateAchievement(username, name)
    const returnData = await streamerService.getEggs()
    res.json(returnData);
  } catch (err) {
    console.error('Error in streamer.controller get.', err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await annotateService.updateData('nethackathon', JSON.stringify(req.body)));
  } catch (err) {
    console.error('Error in annotate.controller updateData.', err.message);
    next(err);
  }
}

module.exports = {
  get,
  update,
  getEggs,
  updateAchievement
}