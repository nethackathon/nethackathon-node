create table event (
    id serial,
    title varchar(255),
    signup_start timestamp,
    signup_end timestamp,
    event_start timestamp,
    event_end timestamp
);

create table event_streamer (
    event_id bigint unsigned,
    streamer_id bigint unsigned,
    start_time timestamp,
    end_time timestamp
);
alter table event_streamer
add constraint fk__event_streamer__event
foreign key (event_id)
references event(id);
alter table event_streamer
add constraint fk__event_streamer__streamer
foreign key (streamer_id)
references streamer(id);

create table event_media (
    id serial,
    event_id bigint unsigned,
    media_type enum('video', 'playlist'),
    video_type enum('full_segment', 'highlight'),
    platform varchar(255) COMMENT 'e.g. youtube | twitch',
    media_url varchar(255),
    thumbnail_url varchar(255),
    title varchar(255),
    description varchar(1024),
    start_time timestamp,
    end_time timestamp
);
alter table event_media
add constraint fk__event_media__event
foreign key (event_id)
references event(id);
