const charityService = require('../services/charity.service');
const axios = require('axios');

let lastCharityProgressFetch = 0;
let charityProgressMemo = {};

async function fetchCharityProgress() {
  try {
    const currentCharity = await charityService.getCurrentCharity();
    if (!currentCharity || !currentCharity.api_endpoint)
      return;
    console.log('fetching charity progress from', currentCharity.api_endpoint);
    const response = await axios.get(currentCharity.api_endpoint);
    console.log('response', response);
    charityProgressMemo = response.data
    lastCharityProgressFetch = Date.now();
  } catch (err) {}
}

async function getCharityProgress(req, res, next) {
  if (Date.now() - lastCharityProgressFetch > 5000) {
    await fetchCharityProgress();
  }
  return res.json(charityProgressMemo);
}

module.exports = {
  getCharityProgress,
}
