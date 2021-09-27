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

# Change this temporary password to what is .env in production
create user nethackathon identified with mysql_native_password by 'nethackathon';
grant all on nethackathon.* to nethackathon;
flush privileges;
