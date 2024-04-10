alter table event_streamer add column survey text null;
alter table event_media modify column media_type enum('video','playlist','image') not null;
alter table event_media modify column video_type enum('full_segment', 'highlight', 'other') not null;
alter table event_media add column submitted_by bigint unsigned;
