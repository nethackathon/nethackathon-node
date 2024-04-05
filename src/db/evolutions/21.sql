create table event_charity (
    event_id serial,
    charity_name varchar(255),
    charity_description text,
    charity_url varchar(255),
    giving_url varchar(255)
);

alter table event_charity
    add constraint fk__event_charity__event
    foreign key (event_id)
    references event(id);

insert into event_charity (event_id, charity_name, charity_description, charity_url, giving_url)
    values(5, 'Girls Who Code',
           '<p>NetHackathon Fall 2023 is raising money for the charity Girls Who Code. Our hope is to both support the effort to get more girls into coding and to train the next generation of open-source roguelike developers!</p> <p>Girls Who Code does more than teach girls to code, they prepare them to thrive and lead in the tech workforce.</p> <p>Girls Who Code values diversity, equity and inclusion as essential to their mission. They focus our work not only on gender diversity but also on young women who are historically underrepresented in computer science fields.</p>',
           'https://girlswhocode.com/', 'https://www.justgiving.com/page/nethackathon');

insert into event_charity (event_id, charity_name, charity_description, charity_url, giving_url)
values(6, 'GiveDirectly',
       '<h3>GiveDirectly gives cash directly to people living in poverty.</h3><p>GiveDirectly is a nonprofit that lets donors like you send money directly to the world’s poorest households. In doing so, they aim to accelerate the end of extreme poverty globally.</p><p>They believe people living in poverty deserve the dignity to choose for themselves how best to improve their lives — cash enables that choice.</p><h3>Donors have delivered over $750 million to people in need.</h3><p>Since 2009, GiveDirectly has delivered $750M+ in cash directly into the hands of over 1.5 million people living in poverty. They currently have operations in Bangladesh, DRC, Kenya, Liberia, Malawi, Mozambique, Morocco, Nigeria, Rwanda, Uganda, and the U.S.</p>',
       'https://www.givedirectly.org/', 'https://www.every.org/givedirectly/f/nethackathon-vi-fundraising');
