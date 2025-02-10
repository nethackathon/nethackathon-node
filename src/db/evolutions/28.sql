insert into event_charity (
  event_id,
  charity_name,
  charity_description,
  charity_url,
  giving_url,
  api_endpoint
) values (
  7,
  "Against Malaria Foundation",
  "<h3>What the Against Malaria Foundation does</h3><h3>They help protect people from malaria.</h3><p>They fund anti-malaria nets, specifically long-lasting insecticidal nets (LLINs), and work with distribution partners to ensure they are used. They track and report on net use and impact.</p><p>100% of the funds they receive from the public buys nets. They achieve this because they have a significant level of pro bono support from organizations and individuals.</p>",
  "https://www.againstmalaria.com/",
  "https://www.every.org/againstmalaria/f/nethackathon-benefit",
  "https://partners.every.org/v0.2/nonprofit/againstmalaria/fundraiser/nethackathon-benefit/raised?apiKey=pk_live_4e50fe0e20be54691b0e1459206c316a"
);

update event_charity set charity_description = "<h3>What the Against Malaria Foundation does</h3><h3>They help protect people from malaria.</h3><p>They fund anti-malaria nets, specifically long-lasting insecticidal nets (LLINs), and work with distribution partners to ensure they are used. They track and report on net use and impact.</p><p>100% of the funds they receive from the public buys nets. They achieve this because they have a significant level of pro bono support from organizations and individuals.</p>" where event_id = 7;
