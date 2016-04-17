drop table if exists spending;

create table spending(
  id integer primary key autoincrement,
  user_id integer not null,
  date text not null,
  sum decimal not null,
  text text not null,
  category int not null
);

drop table if exists user;

create table user(
  id integer primary key autoincrement,
  login text not null,
  password text not null
);


drop table if exists auth_token;

create table auth_token(
  id integer primary key autoincrement,
  token text not null,
  user_id integer not null
);
