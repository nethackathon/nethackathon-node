create database nethackathon;

create table user (
    id SERIAL,
    username varchar(32) character set utf8 not null,
    password_character varchar(1) character set latin1 not null,
    password_color varchar(7) character set latin1 not null,
    token varchar(16000) character set utf8
);

create table annotate (
    id SERIAL,
    user_id BIGINT UNSIGNED NOT NULL,
    data JSON,
    foreign key (user_id) references user(id) on delete cascade
);

create table sokoban (
    id serial,
    user_id bigint unsigned not null,
    turn_count int unsigned not null,
    time_seconds int unsigned not null,
    soko_level tinyint unsigned not null,
    soko_sublevel tinyint unsigned not null,
    soko_path json,
    foreign key (user_id) references user(id) on delete cascade);

# Change this temporary password to what is .env in production
create user nethackathon identified with mysql_native_password by 'nethackathon';
grant all on nethackathon.* to nethackathon;
flush privileges;
