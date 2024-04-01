-- Fall 2023 Event
SET time_zone = "+00:00";
insert into event (
    id,
    title,
    signup_start,
    signup_end,
    event_start,
    event_end
) values (
    5,
    'Fall 2023',
    '2023-08-08 00:00:00',
    '2023-08-18 00:00:00',
    '2023-09-08 17:00:00',
    '2023-09-11 01:00:00'
);

insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'Theyflower'), '2023-09-08 17:00:00', '2023-09-08 19:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'HakureiDeity'), '2023-09-08 19:00:00', '2023-09-08 21:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'DryadMin'), '2023-09-08 21:00:00', '2023-09-08 23:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'Fejana'), '2023-09-08 23:00:00', '2023-09-09 01:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'Unit327'), '2023-09-09 01:00:00', '2023-09-09 03:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'LythariDrow'), '2023-09-09 03:00:00', '2023-09-09 05:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'jonosmalls88'), '2023-09-09 05:00:00', '2023-09-09 07:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'lexi_thymi'), '2023-09-09 07:00:00', '2023-09-09 09:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'finitelycraig'), '2023-09-09 09:00:00', '2023-09-09 11:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'MajinBird'), '2023-09-09 11:00:00', '2023-09-09 13:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'doktor__l'), '2023-09-09 13:00:00', '2023-09-09 15:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'AmericanElm'), '2023-09-09 15:00:00', '2023-09-09 17:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'ChaoticQuakka'), '2023-09-09 17:00:00', '2023-09-09 19:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'followgraves'), '2023-09-09 19:00:00', '2023-09-09 21:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'PeteGoz'), '2023-09-09 21:00:00', '2023-09-09 23:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'NabruRocks'), '2023-09-09 23:00:00', '2023-09-10 01:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'spazm9000'), '2023-09-10 01:00:00', '2023-09-10 03:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'knnn391'), '2023-09-10 03:00:00', '2023-09-10 05:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'Andrio_Celos'), '2023-09-10 05:00:00', '2023-09-10 07:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'Cloudmillion'), '2023-09-10 07:00:00', '2023-09-10 09:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'aoeixsz4'), '2023-09-10 09:00:00', '2023-09-10 11:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'lidlraccoon'), '2023-09-10 11:00:00', '2023-09-10 13:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'd_i_s_p_e_r_s_e'), '2023-09-10 13:00:00', '2023-09-10 15:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'ashpool37'), '2023-09-10 15:00:00', '2023-09-10 17:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'k2_1971'), '2023-09-10 17:00:00', '2023-09-10 19:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'JJvanTheMan'), '2023-09-10 19:00:00', '2023-09-10 21:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'Priestess_of_Athe'), '2023-09-10 21:00:00', '2023-09-10 23:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (5, (select id from streamer where username = 'luxidream'), '2023-09-10 23:00:00', '2023-09-11 01:00:00');

insert into event_media (event_id, media_type, video_type, platform, media_url, title, description, start_time, end_time)
  values (5, 'playlist', 'full_segment', 'youtube', 'https://www.youtube.com/embed/videoseries?si=4WP5BoZXTzCt9O1j&amp;list=PLChC_Y8sQL22JhiSBMBxS3qSCVJ7ry7Ni', 'Streamer Segments Compilation: YouTube Playlist', 'This event included a NetHack Bingo competition!', '2023-09-08 17:00:00', '2022-09-11 01:00:00');
