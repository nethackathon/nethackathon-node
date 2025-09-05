const baseService = require('../services/base.service');
const schedule = require('../data/current-schedule');

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

async function fetchText(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'nethackathon-node/1.0'
      }
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for URL: ${url}`);
    }
    return await response.text();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

let lastLivelogFetch = 0;
let livelogMemo = [];

async function fetchLiveLog() {
  try {
    const livelogURLs = [
      'https://www.hardfought.org/xlogfiles/nethackathon/livelog',
      'https://eu.hardfought.org/xlogfiles/nethackathon/livelog',
      'https://au.hardfought.org/xlogfiles/nethackathon/livelog',
    ];
    
    // Fetch from URLs individually, skip ones that fail
    const textResults = [];
    for (const url of livelogURLs) {
      try {
        const text = await fetchText(url);
        textResults.push(text);
        console.log(`Successfully fetched livelog from: ${url}`);
      } catch (err) {
        console.log(`Skipping ${url} (not available yet): ${err.message}`);
        // Don't add to textResults, just skip this URL
      }
    }
    
    const output = [];
    const lines = textResults.join('').split('\n');
    lines.forEach((line) => {
      const l = line.match(/lltype=(\w+).*name=(\w+).*role=(\w+).*race=(\w+).*gender=(\w+).*align=(\w+).*turns=(\w+).*curtime=(\w+).*message=(.*)/)
      if (l && l.length > 7) {
        const logTime = parseInt(l[8]);
        output.push({message: `${l[2]} (${l[3]} ${l[4]} ${l[5]} ${l[6]}) ${l[9]}, on T:${l[7]}`, time: logTime, type: l[1]});
      }
    });
    livelogMemo = output;
    lastLivelogFetch = Date.now();
    console.log(`fetchLiveLog completed, found ${output.length} entries from ${textResults.length} sources`);
  } catch (err) {
    console.error('Error in fetchLiveLog:', err.message, err);
  }
}

async function getHardfoughtLiveLog(req, res, next) {
  if (Date.now() - lastLivelogFetch > 5000) {
    await fetchLiveLog();
  }
  return res.json(livelogMemo);
}

let lastEndedGamesFetch = 0;
let endedGamesMemo = [];


async function fetchEndedGames() {
  try {
    const livelogURLs = [
      'https://www.hardfought.org/xlogfiles/nethackathon/xlogfile',
      'https://eu.hardfought.org/xlogfiles/nethackathon/xlogfile',
      'https://au.hardfought.org/xlogfiles/nethackathon/xlogfile',
    ];
    
    // Fetch from URLs individually, skip ones that fail
    const textResults = [];
    for (const url of livelogURLs) {
      try {
        const text = await fetchText(url);
        textResults.push(text);
        console.log(`Successfully fetched xlogfile from: ${url}`);
      } catch (err) {
        console.log(`Skipping ${url} (not available yet): ${err.message}`);
        // Don't add to textResults, just skip this URL
      }
    }
    
    const output = [];
    const lines = textResults.join('').split('\n');
    lines.forEach((line) => {
      if (line.length > 0) {
        const vars = line.split(/\s{4}|\t/)
        const varObj = {}
        vars.forEach((v) => {
          let varr = v.split(/=/)
          varObj[varr[0]] = varr[1]
        })
        const logTime = parseInt(varObj['endtime']);
        output.push({message: `${varObj['name']} (${varObj['role']} ${varObj['race']} ${varObj['gender']} ${varObj['align']}) ${varObj['death']}, on T:${varObj['turns']}`, time: logTime, type: 16384});
      }
    });
    endedGamesMemo = output;
    lastEndedGamesFetch = Date.now();
    console.log(`fetchEndedGames completed, found ${output.length} entries from ${textResults.length} sources`);
  } catch (err) {
    console.error('Error in fetchEndedGames:', err.message, err);
  }
}
async function getHardfoughtEndedGames(req, res, next) {
  if (Date.now() - lastEndedGamesFetch > 5000) {
    await fetchEndedGames();
  }
  return res.json(endedGamesMemo);
}

module.exports = {
  getTagline,
  getStreamers,
  getStreamersSchedule,
  getHardfoughtLiveLog,
  getHardfoughtEndedGames,
  getSchedule,
}
