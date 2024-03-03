const eventService = require('../services/event.service');

async function getCurrentEvent(req, res, next) {
  try {
    const returnData = await eventService.getCurrentEvent();
    res.json({currentEvent: returnData});
  } catch (err) {
    console.error('Error in event.controller getCurrentEvent.', err.message);
    next(err);
  }
}

async function getEventById(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const returnData = await eventService.getEventById(eventId);
    res.json({event: returnData});
  } catch (err) {
    console.error('Error in event.controller getEventById.', err.message);
    next(err);
  }
}

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
  getCurrentEvent,
  getEventById,
  getEvents,
  getMediaByEventId,
  getStreamersByEventId,
}
