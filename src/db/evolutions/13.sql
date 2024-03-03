-- Spring 2022 Event

insert into event (
    id,
    title,
    signup_start,
    signup_end,
    event_start,
    event_end
) values (
    2,
    'Spring 2022',
    '2022-03-16 00:00:00',
    '2022-04-01 00:00:00',
    '2022-04-16 05:00:00',
    '2022-04-17 21:00:00'
);

insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'hackemslashem'), '2022-04-15 19:00:00', '2022-04-15 21:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'AntiGulp'), '2022-04-15 21:00:00', '2022-04-15 23:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'Cloudmillion'), '2022-04-15 23:00:00', '2022-04-16 01:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'spazm9000'), '2022-04-16 01:00:00', '2022-04-16 03:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'luxidream'), '2022-04-16 03:00:00', '2022-04-16 05:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'Andrio_Celos'), '2022-04-16 05:00:00', '2022-04-16 07:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'PeteGoz'), '2022-04-16 07:00:00', '2022-04-16 09:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'ashpooljohn'), '2022-04-16 09:00:00', '2022-04-16 11:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'lidlraccoon'), '2022-04-16 11:00:00', '2022-04-16 13:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'AmericanElm'), '2022-04-16 13:00:00', '2022-04-16 15:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'luxidream'), '2022-04-16 15:00:00', '2022-04-16 17:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'Theyflower'), '2022-04-16 17:00:00', '2022-04-16 19:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'kougyoku_gentou'), '2022-04-16 19:00:00', '2022-04-16 21:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'shadowrider38'), '2022-04-16 20:00:00', '2022-04-16 22:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'HakureiDeity'), '2022-04-16 23:00:00', '2022-04-17 01:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'Priestess_of_Athe'), '2022-04-17 01:00:00', '2022-04-17 03:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'JJvanTheMan'), '2022-04-17 03:00:00', '2022-04-17 05:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'Krump_O'), '2022-04-17 05:00:00', '2022-04-17 07:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'aoeixsz4'), '2022-04-17 07:00:00', '2022-04-17 09:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'toddrafter'), '2022-04-17 09:00:00', '2022-04-17 12:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'finitelycraig'), '2022-04-17 12:00:00', '2022-04-17 15:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'l__e__w'), '2022-04-17 15:00:00', '2022-04-17 17:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'd_i_s_p_e_r_s_e'), '2022-04-17 17:00:00', '2022-04-17 19:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (2, (select id from streamer where username = 'd_i_s_p_e_r_s_e'), '2022-04-17 19:00:00', '2022-04-17 21:00:00');


insert into event_media (event_id, media_type, video_type, platform, media_url, title, description, start_time, end_time)
  values (2, 'playlist', 'full_segment', 'youtube', 'https://www.youtube-nocookie.com/embed/videoseries?list=PLChC_Y8sQL22DocizsU2MRGtd7N8R5k5u&origin=https://nethackathon.org', 'Streamer Segments Compilation: YouTube Playlist', 'Our 2nd event, held April 15 - 17th 2022, had an Easter theme including an egg hunt.', '2022-04-16 05:00:00', '2022-04-17 21:00:00');

insert into event_media (event_id, media_type, video_type, platform, media_url, title, description, start_time, end_time)
  values (2, 'playlist', 'highlight', 'youtube', 'https://www.youtube-nocookie.com/embed/videoseries?list=PLChC_Y8sQL22QR0f4SWbcbCyGWKf9x8GU', 'Highlights: YouTube Playlist', null, '2022-04-16 05:00:00', '2022-04-17 21:00:00');
