const eventService = require('../services/event.service');

async function getEvents(req, res, next) {
  try {
    const returnData = await eventService.getEvents();
    res.json({events: returnData});
  } catch (err) {
    console.error('Error in event.controller getEvents.', err.message);
    next(err);
  }
}

async function getStreamersByEventId(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const returnData = await eventService.getStreamersByEventId(eventId);
    res.json({streamers: returnData});
  } catch (err) {
    console.error('Error in event.controller getStreamersByEventId.', err.message);
    next(err);
  }
}

async function getMediaByEventId(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const returnData = await eventService.getMediaByEventId(eventId);
    res.json({media: returnData});
  } catch (err) {
    console.error('Error in event.controller getMediaByEventId.', err.message);
    next(err);
  }
}

module.exports = {
  getEvents,
  getMediaByEventId,
  getStreamersByEventId,
}
