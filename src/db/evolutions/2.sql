create table streamer (
    id SERIAL,
    username varchar(64) character set utf8 not null,
    twitch_id varchar(64) character set utf8 not null,
    access_token varchar(2048) character set utf8 null,
    schedule text character set utf8
);
