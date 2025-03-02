const eventService = require('../services/event.service');

async function getCurrentEvent(req, res, next) {
  try {
    const returnData = await eventService.getCurrentEvent();
    res.json({ currentEvent: returnData });
  } catch (err) {
    console.error('Error in event.controller getCurrentEvent.', err.message);
    next(err);
  }
}

async function getLastEvent(req, res, next) {
  try {
    const returnData = await eventService.getLastEvent();
    res.json({ lastEvent: returnData });
  } catch (err) {
    console.error('Error in event.controller getLastEvent.', err.message);
    next(err);
  }
}

async function getCurrentEventSchedule(req, res, next) {
  try {
    const returnData = await eventService.getCurrentEventSchedule();
    res.json(returnData);
  } catch (err) {
    console.error('Error in event.controller getCurrentEventSchedule.', err.message);
    next(err);
  }
}

async function getEventById(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const returnData = await eventService.getEventById(eventId);
    res.json({ event: returnData });
  } catch (err) {
    console.error('Error in event.controller getEventById.', err.message);
    next(err);
  }
}

async function getEvents(req, res, next) {
  try {
    const returnData = await eventService.getEvents();
    res.json({ events: returnData });
  } catch (err) {
    console.error('Error in event.controller getEvents.', err.message);
    next(err);
  }
}

async function getStreamersByEventId(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const returnData = await eventService.getStreamersByEventId(eventId);
    res.json({ streamers: returnData });
  } catch (err) {
    console.error('Error in event.controller getStreamersByEventId.', err.message);
    next(err);
  }
}

async function getMediaByEventId(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const returnData = await eventService.getMediaByEventId(eventId);
    res.json({ media: returnData });
  } catch (err) {
    console.error('Error in event.controller getMediaByEventId.', err.message);
    next(err);
  }
}

async function getScheduleByEventId(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const returnData = await eventService.getScheduleByEventId(eventId);
    res.json({ schedule: returnData });
  } catch (err) {
    console.error('Error in event.controller getScheduleByEventId.', err.message);
    next(err);
  }
}

async function createEvent(req, res, next) {
  try {
    const eventData = req.body;
    const { title, signup_start, signup_end, event_start, event_end } = eventData;
    const returnData = await eventService.createEvent(title, signup_start, signup_end, event_start, event_end);
    res.json({ event: returnData });
  } catch (err) {
    console.error('Error in event.controller createEvent.', err.message);
    next(err);
  }
}

async function updateEvent(req, res, next) {
  try {
    const eventData = req.body;
    const { id, title, signup_start, signup_end, event_start, event_end } = eventData;
    const returnData = await eventService.updateEvent(id, title, signup_start, signup_end, event_start, event_end);
    res.json({ event: returnData });
  } catch (err) {
    console.error('Error in event.controller updateEvent.', err.message);
    next(err);
  }
}

async function getStreamersScheduleByEventId(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const returnData = await eventService.getStreamersScheduleByEventId(eventId);
    res.json({ streamers: returnData });
  } catch (err) {
    console.error('Error in event.controller getStreamersScheduleByEventId.', err.message);
    next(err);
  }
}

async function updateEventSchedule(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const { schedule } = req.body;
    await eventService.updateEventSchedule(eventId, schedule);
    res.json({ message: 'Schedule updated successfully' });
  } catch (err) {
    console.error('Error in event.controller updateEventSchedule.', err.message);
    next(err);
  }
}

async function toggleEventSchedulePublished(req, res, next) {
  try {
    const eventId = req.params.eventId;
    await eventService.toggleEventSchedulePublished(eventId);
    res.json({ message: 'Schedule published/unpublished successfully' });
  } catch (err) {
    console.error('Error in event.controller toggleEventSchedulePublished.', err.message);
    next(err);
  }
}

module.exports = {
  createEvent,
  getCurrentEvent,
  getCurrentEventSchedule,
  getEventById,
  getEvents,
  getLastEvent,
  getMediaByEventId,
  getScheduleByEventId,
  getStreamersByEventId,
  getStreamersScheduleByEventId,
  toggleEventSchedulePublished,
  updateEvent,
  updateEventSchedule,
}
