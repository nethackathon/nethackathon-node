const db = require('./db.service')

async function getCurrentCharity() {
  const records = await db.query(
    `select c.charity_name, c.charity_description, c.charity_url, c.giving_url, c.api_endpoint
         from event e
         left join event_charity c on c.event_id = e.id
         order by e.event_start desc
         limit 1;`
  );
  return(records[0]);
}

module.exports = {
  getCurrentCharity,
}
