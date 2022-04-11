create table achievement (
    id SERIAL,
    name varchar(64) character set utf8 not null,
    type varchar(64) character set utf8 not null
);

create table streamer_achievement (
    id SERIAL,
    achievement_id bigint unsigned not null,
    streamer_id bigint unsigned not null,
    foreign key (achievement_id) references achievement(id) on delete cascade,
    foreign key (streamer_id) references streamer(id) on delete cascade
);
