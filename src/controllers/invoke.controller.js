const invokeService = require('../services/invoke.service');

async function get(req, res, next) {
  try {
    const response = {
      claimee: req.user.username,
      accessToken: req.user.access_token 
    };
    res.json(response);
  } catch (err) {
    console.error('Error in invoke.controller get.', err.message);
    next(err);
  }
}

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

async function releaseAdventurer(req, res, next) {
  try {
    const claimee = req.user.username;
    const characterName = req.body['characterName']
    res.json(await invokeService.releaseAdventurer(claimee, characterName));
  } catch (err) {
    console.error('Error in invoke.controller claimAdventurer.', err.message);
    next(err);
  }
}

async function uploadSave(req, res, next) {
  try {
    console.log('uploadSave req', req);
    // TODO: record file name in database
    res.status(200).send()
  } catch (err) {
    console.error('Error in invoke.controller uploadSave.', err.message);
    next(err);
  }
}

module.exports = {
  releaseAdventurer,
  get,
  getAdventurer,
  claimAdventurer,
  uploadSave
}