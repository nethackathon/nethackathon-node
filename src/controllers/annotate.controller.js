const annotateService = require('../services/annotate.service');

async function getData(req, res, next) {
  try {
    res.json(await annotateService.getData(req.username));
  } catch (err) {
    console.error('Error in annotate.controller getData.', err.message);
    next(err);
  }
}

async function updateData(req, res, next) {
  try {
    res.json(await annotateService.updateData(req.username, JSON.stringify(req.body)));
  } catch (err) {
    console.error('Error in annotate.controller updateData.', err.message);
    next(err);
  }
}

async function deleteData(req, res, next) {
  try {
    res.json(await annotateService.deleteData(req.username));
  } catch (err) {
    console.error('Error in annotate.controller deleteData.', err.message);
    next(err);
  }
}

module.exports = {
  getData,
  updateData,
  deleteData
}