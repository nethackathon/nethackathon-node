const invokeService = require('../services/invoke.service');
const fs = require('fs');
const path = require('path');

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
    const characterName = req.body['characterName'];
    const response = await invokeService.claimAdventurer(claimee, characterName);
    console.log('claimAdventurer response', response);
    if (!response.claimSuccessful) {
      return res.status(200).send(response);
    }
    const latestUpload = await invokeService.getLatestUpload(characterName);
    console.log('latestUpload', latestUpload);
    return res.status(200).send({ ...latestUpload, ...response });
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
    await invokeService.recordUpload(req.body.characterName, req.user.username, req.file.filename);
    res.status(200).send()
  } catch (err) {
    console.error('Error in invoke.controller uploadSave.', err.message);
    next(err);
  }
}

async function downloadSave(req, res, next) {
  try {
    let headers = {
      'Connection': 'close',
      'Content-Encoding': 'gzip'
    }
    const filePath = path.join(__dirname, '..', '..', 'saves', req.body['fileName']);
    let file = fs.readFileSync(filePath); 
    headers['Content-Length'] = file.length;
    res.writeHead(200, headers);
    let chunkLimit = 16 * 1024;
    let chunkCount = Math.ceil(file.length / chunkLimit);
    for (let i = 0; i < chunkCount; i++) {
      if (chunkCount > 1) {
        let chunk = file.slice(i * chunkLimit, (i + 1) * chunkLimit);
        res.write(chunk);
      } else {
        res.write(file);
      }
    }
    res.end();
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
  uploadSave,
  downloadSave
}