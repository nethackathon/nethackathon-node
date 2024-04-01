-- Fall 2022 Event
SET time_zone = "+00:00";
insert into event (
    id,
    title,
    signup_start,
    signup_end,
    event_start,
    event_end
) values (
    3,
    'Fall 2022',
    '2022-08-01 00:00:00',
    '2022-09-01 00:00:00',
    '2022-09-16 22:00:00',
    '2022-09-19 00:00:00'
);

insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'Cloudmillion'), '2022-09-16 22:00:00', '2022-09-17 00:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'JJvanTheMan'), '2022-09-17 00:00:00', '2022-09-17 02:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'jonosmalls88'), '2022-09-17 02:00:00', '2022-09-17 04:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'TiLonGonn'), '2022-09-17 04:00:00', '2022-09-17 06:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'Andrio_Celos'), '2022-09-17 06:00:00', '2022-09-17 08:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'doktor__l'), '2022-09-17 08:00:00', '2022-09-17 10:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'toddrafter'), '2022-09-17 10:00:00', '2022-09-17 12:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'PeteGoz'), '2022-09-17 12:00:00', '2022-09-17 14:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'AntiGulp'), '2022-09-17 14:00:00', '2022-09-17 16:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'finitelycraig'), '2022-09-17 16:00:00', '2022-09-17 18:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'HakureiDeity'), '2022-09-17 18:00:00', '2022-09-17 20:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'LythariDrow'), '2022-09-17 20:00:00', '2022-09-17 22:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'NabruRocks'), '2022-09-17 22:00:00', '2022-09-18 00:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'DryadMin'), '2022-09-18 00:00:00', '2022-09-18 02:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'spazm9000'), '2022-09-18 02:00:00', '2022-09-18 04:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'Unit327'), '2022-09-18 04:00:00', '2022-09-18 06:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'shadowrider38'), '2022-09-18 06:00:00', '2022-09-18 08:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'ashpool37'), '2022-09-18 08:00:00', '2022-09-18 10:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'AmericanElm'), '2022-09-18 10:00:00', '2022-09-18 12:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'd_i_s_p_e_r_s_e'), '2022-09-18 12:00:00', '2022-09-18 14:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'Theyflower'), '2022-09-18 14:00:00', '2022-09-18 16:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'luxidream'), '2022-09-18 16:00:00', '2022-09-18 19:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'KwotaV'), '2022-09-18 19:00:00', '2022-09-18 20:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'Priestess_of_Athe'), '2022-09-18 20:00:00', '2022-09-18 22:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (3, (select id from streamer where username = 'TiraBlazar'), '2022-09-18 22:00:00', '2022-09-19 00:00:00');


insert into event_media (event_id, media_type, video_type, platform, media_url, title, description, start_time, end_time)
  values (3, 'playlist', 'full_segment', 'youtube', 'https://www.youtube.com/embed/videoseries?list=PLChC_Y8sQL20b___7vvRlRQbKBuNf4dAx', 'Streamer Segments Compilation: YouTube Playlist', 'The 3rd ever NetHackathon had many new streamers, and many return streamers.', '2022-09-16 22:00:00', '2022-09-19 00:00:00');
