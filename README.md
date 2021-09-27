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
