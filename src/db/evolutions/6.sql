create table upload (
    id SERIAL,
    character_name varchar(64) character set utf8 not null,
    uploaded_by varchar(64) character set utf8 not null,
    file_name varchar(256) character set utf8,
    uploaded_at datetime
);
