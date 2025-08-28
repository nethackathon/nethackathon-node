const charityService = require('../services/charity.service');

let lastCharityProgressFetch = 0;
let charityProgressMemo = {};

async function fetchCharityProgress() {
  try {
    const currentCharity = await charityService.getCurrentCharity();
    if (!currentCharity || !currentCharity.api_endpoint)
      return;
    const response = await fetch(currentCharity.api_endpoint);
    charityProgressMemo = await response.json();
    lastCharityProgressFetch = Date.now();
  } catch (err) { }
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
