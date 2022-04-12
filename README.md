# Livelog
  - Client should be able to request all lines after a certain timestamp
  - Keep last 1000 lines in memory

# Remember
  - We repurposed the signup callbacks for streamer login, probably worth
combining those two pages regardless.

# Database schema

## user
  - id bigint unsigned unique auto_increment not null
  - username varchar(32) character set utf8 not null
  - password_character varchar(1) character set latin1 not null
  - password_color varchar(7) character set latin1 not null
  - token varchar(16000) character set utf8

## annotate
  - id bigint unsigned unique auto_increment not null
  - user_id bigint unsigned not null
  - data json

## sokoban
  - id bigint unsigned unique auto_increment not null
  - user_id bigint unsigned not null
  - turn_count int unsigned not null
  - time_seconds int unsigned not null
  - soko_level tinyint unsigned not null
  - soko_sublevel tinyint unsigned not null
  - soko_path json
