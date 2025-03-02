const { DateTime } = require('luxon');

function convertToSqlDateTime(utcString) {
  return DateTime.fromISO(utcString).toUTC().toFormat('yyyy-MM-dd HH:mm:ss');
}

module.exports = {
  convertToSqlDateTime,
}