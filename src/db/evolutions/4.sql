create table adventurer (
    id SERIAL,
    claimed_by varchar(64) character set utf8,
    character_name varchar(64) character set utf8 not null,
    claimed_at date,
    last_alive_at date
);
