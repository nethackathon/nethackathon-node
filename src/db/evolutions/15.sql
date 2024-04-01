-- Spring 2023 Event
SET time_zone = "+00:00";
insert into event (
    id,
    title,
    signup_start,
    signup_end,
    event_start,
    event_end
) values (
    4,
    'Spring 2023',
    '2023-03-14 00:00:00',
    '2023-03-16 00:00:00',
    '2023-04-14 22:00:00',
    '2023-04-16 00:00:00'
);

insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'Cloudmillion'), '2023-04-14 22:00:00', '2023-04-15 00:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'JJvanTheMan'), '2023-04-15 00:00:00', '2023-04-15 02:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'jonosmalls88'), '2023-04-15 02:00:00', '2023-04-15 04:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'hackemslashem'), '2023-04-15 04:00:00', '2023-04-15 06:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'Andrio_Celos'), '2023-04-15 06:00:00', '2023-04-15 08:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'lexi_milch'), '2023-04-15 08:00:00', '2023-04-15 10:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'lidlraccoon'), '2023-04-15 10:00:00', '2023-04-15 12:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'PeteGoz'), '2023-04-15 12:00:00', '2023-04-15 14:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'AntiGulp'), '2023-04-15 14:00:00', '2023-04-15 16:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'finitelycraig'), '2023-04-15 16:00:00', '2023-04-15 18:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'HakureiDeity'), '2023-04-15 18:00:00', '2023-04-15 20:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'LythariDrow'), '2023-04-15 20:00:00', '2023-04-15 22:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'NabruRocks'), '2023-04-15 22:00:00', '2023-04-16 00:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'DryadMin'), '2023-04-16 00:00:00', '2023-04-16 02:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'spazm9000'), '2023-04-16 02:00:00', '2023-04-16 04:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'Unit327'), '2023-04-16 04:00:00', '2023-04-16 06:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'MajinBird'), '2023-04-16 06:00:00', '2023-04-16 09:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'AmericanElm'), '2023-04-16 09:00:00', '2023-04-16 12:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'd_i_s_p_e_r_s_e'), '2023-04-16 12:00:00', '2023-04-16 14:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'Theyflower'), '2023-04-16 14:00:00', '2023-04-16 16:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'luxidream'), '2023-04-16 16:00:00', '2023-04-16 20:00:00');
insert into event_streamer (event_id, streamer_id, start_time, end_time)
  values (4, (select id from streamer where username = 'Priestess_of_Athe'), '2023-04-16 20:00:00', '2023-04-16 22:00:00');
