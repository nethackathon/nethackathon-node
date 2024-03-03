-- Fall 2021 Event

insert into event (
    id,
    title,
    signup_start,
    signup_end,
    event_start,
    event_end
) values (
    1,
    'Fall 2021',
    '2021-08-05 00:00:00',
    '2021-09-05 00:00:00',
    '2021-09-10 17:00:00',
    '2021-09-13 01:00:00'
);

insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'tonehack'), '2021-09-10 17:00:00', '2021-09-10 21:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'Cloudmillion'), '2021-09-10 21:00:00', '2021-09-10 23:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'JJvanTheMan'), '2021-09-10 23:00:00', '2021-09-11 02:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'LythariDrow'), '2021-09-11 02:00:00', '2021-09-11 05:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'Priestess_of_Athe'), '2021-09-11 05:00:00', '2021-09-11 07:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'ichbinmiah'), '2021-09-11 07:00:00', '2021-09-11 10:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'AmericanElm'), '2021-09-11 10:00:00', '2021-09-11 13:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'KitsukoKi'), '2021-09-11 13:00:00', '2021-09-11 16:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'watchingugo'), '2021-09-11 16:00:00', '2021-09-11 18:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'luxidream'), '2021-09-11 18:00:00', '2021-09-11 22:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'PeteGoz'), '2021-09-11 22:00:00', '2021-09-12 00:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'AntiGulp'), '2021-09-12 00:00:00', '2021-09-12 03:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'Diggitysc'), '2021-09-12 03:00:00', '2021-09-12 05:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'toddrafter'), '2021-09-12 05:00:00', '2021-09-12 08:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'ashpooljohn'), '2021-09-12 08:00:00', '2021-09-12 11:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'finitelycraig'), '2021-09-12 11:00:00', '2021-09-12 14:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'QueenXerxes'), '2021-09-12 14:00:00', '2021-09-12 17:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'luxidream'), '2021-09-12 17:00:00', '2021-09-12 20:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'theyflower'), '2021-09-12 20:00:00', '2021-09-12 22:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'd_i_s_p_e_r_s_e'), '2021-09-12 22:00:00', '2021-09-13 01:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
values (1, (select id from streamer where username = 'shadowrider38'), '2021-09-13 01:00:00', '2021-09-13 04:00:00');

insert into event_media (event_id, media_type, video_type, platform, media_url, title, description, start_time, end_time)
values (1, 'playlist', 'full_segment', 'youtube', 'https://www.youtube.com/embed/videoseries?list=PLChC_Y8sQL214ruTt5t6eKeu0Z2Y_BZgu', 'Streamer Segments Compilation: YouTube Playlist', 'On September 10 - 12, 2021, twenty-two Twitch content creators streamed NetHack continuously for over 56 hours!', '2021-09-10 17:00:00', '2021-09-13 04:00:00');
