alter table event
    add column xlogfile_urls varchar(512);
alter table event
    add column livelog_urls varchar(512);
alter table event_media
    add column admin_verified tinyint(1) default 0;
