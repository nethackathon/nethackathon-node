const baseService = require('../services/base.service');
const { exec } = require('child_process');
const path = require('path');
const schedule = require('../data/schedule-spring-2022');

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
    console.error('Error in base.controller getStreamers.', err.message);
    next(err);
  }
}

async function getStreamersSchedule(req, res, next) {
  try {
    res.json(await baseService.getStreamersSchedule());
  } catch (err) {
    console.error('Error in base.controller getStreamerSchedule.', err.message);
    next(err);
  }
}

async function getSchedule(req, res, next) {
  try {
    res.json(schedule);
  } catch (err) {
    console.error('Error in base.controller getSchedule.', err.message);
    next(err);
  }
}

async function getLiveLog(req, res, next) {
  try {
    const livelogPath = path.join(__dirname, '..', '..', 'livelog'); 
    exec(`tail -n 10 ${livelogPath}`, (error, stdout, stderr) => {
      const output = [];
      const lines = stdout.split('\n');
      lines.forEach((line) => {
        const l = line.match(/name=(\w+).*role=(\w+).*race=(\w+).*gender=(\w+).*align=(\w+).*turns=(\w+).*message=(.*)/)
        if (l && l.length > 7) {
          output.push(`${l[1]} (${l[2]} ${l[3]} ${l[4]} ${l[5]}) ${l[7]}, on T:${l[6]}`)
        }
      });
      /*
      lltype=16384    name=nethackathon       role=Ran        race=Elf        gender=Fem      align=Cha       turns=375       starttime=1649709862    curtime=1649711620      message=killed by a hallucinogen-distorted coyote
      wispofvapor (Sam Hum Fem Law) entered Gehennom, on T:35598
       */
      return res.json(output);
    })
  } catch (err) {
    console.error('Error in base.controller getLiveLog.', err.message);
    next(err);
  }
}

module.exports = {
  getTagline,
  getStreamers,
  getStreamersSchedule,
  getLiveLog,
  getSchedule
}