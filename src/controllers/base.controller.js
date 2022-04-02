const baseService = require('../services/base.service');

async function getTagline(req, res, next) {
  try {
    res.json(await baseService.getTagline());
  } catch (err) {
    console.error('Error in base.controller getTagline.', err.message);
    next(err);
  }
}

async function getStreamers(req, res, next) {
  try {
    res.json(await baseService.getStreamers());
  } catch (err) {
    console.error('Error in annotate.controller updateData.', err.message);
    next(err);
  }
}

async function getStreamersSchedule(req, res, next) {
  try {
    res.json(await baseService.getStreamersSchedule());
  } catch (err) {
    console.error('Error in annotate.controller deleteData.', err.message);
    next(err);
  }
}

module.exports = {
  getTagline,
  getStreamers,
  getStreamersSchedule
}