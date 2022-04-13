const baseService = require('../services/base.service');
const { exec } = require('child_process');
const path = require('path');
const schedule = require('../data/schedule-spring-2022');
const livelogLines = (process.env.LIVELOG_LINES) ? (process.env.LIVELOG_LINES) : 100

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
    let curTime = req.query['curtime'];
    if (curTime !== undefined) curTime = parseInt(curTime);

    const livelogPath = path.join(__dirname, '..', '..', 'livelog');
    exec(`tail -n ${livelogLines} ${livelogPath}`, (error, stdout, stderr) => {
      const output = [];
      const lines = stdout.split('\n');
      lines.forEach((line) => {
        const l = line.match(/lltype=(\w+).*name=(\w+).*role=(\w+).*race=(\w+).*gender=(\w+).*align=(\w+).*turns=(\w+).*curtime=(\w+).*message=(.*)/)
        if (l && l.length > 7) {
          const logTime = parseInt(l[8]);
          // if curtime query string 
          if (curTime === undefined || logTime > curTime) {
            output.push({message: `${l[2]} (${l[3]} ${l[4]} ${l[5]} ${l[6]}) ${l[9]}, on T:${l[7]}`, time: logTime, type: l[1]});
          }
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

async function getEndedGames(req, res, next) {
  try {
    const livelogPath = path.join(__dirname, '..', '..', 'livelog');
    exec(`grep 'lltype=16384' ${livelogPath}`, (error, stdout, stderr) => {
      const output = [];
      const lines = stdout.split('\n');
      lines.forEach((line) => {
        const l = line.match(/lltype=(\w+).*name=(\w+).*role=(\w+).*race=(\w+).*gender=(\w+).*align=(\w+).*turns=(\w+).*curtime=(\w+).*message=(.*)/)
        if (l && l.length > 7) {
          const logTime = parseInt(l[8]);
          output.push({message: `${l[2]} (${l[3]} ${l[4]} ${l[5]} ${l[6]}) ${l[9]}, on T:${l[7]}`, time: logTime, type: l[1]});
        }
      });
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
  getSchedule,
  getEndedGames
}