const invokeService = require('../services/invoke.service');

async function getAdventurer(req, res, next) {
  try {
    const characterName = req.query['character_name']
    res.json(await invokeService.getAdventurer(characterName));
  } catch (err) {
    console.error('Error in invoke.controller getAdventurer.', err.message);
    next(err);
  }
}

async function claimAdventurer(req, res, next) {
  try {
    const claimee = req.user.username;
    const characterName = req.body['characterName']
    res.json(await invokeService.claimAdventurer(claimee, characterName));
  } catch (err) {
    console.error('Error in invoke.controller claimAdventurer.', err.message);
    next(err);
  }
}

module.exports = {
  getAdventurer,
  claimAdventurer
}