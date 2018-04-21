drop table if exists category;
create table category (
  id integer primary key autoincrement,
  name text not null,
  user_id integer not null
);

create index ix_category_id on category(id);
create index ix_category_user_id on category(user_id);

insert into category(name, user_id)
	values ('Еда', 0), ('Проезд', 0);


drop table if exists spending;
create table spending(
  id integer primary key autoincrement,
  user_id integer not null,
  date text not null,
  sum integer not null,
  text text not null,
  category_id integer not null
);

create index ix_spending_id on spending(id);
create index ix_spending_user_id on spending(user_id);
create index ix_spending_category_id on spending(category_id);


drop table if exists user;
create table user(
  id integer primary key autoincrement,
  login text not null,
  password text not null
);

create index ix_user_id on user(id);


drop table if exists auth_token;
create table auth_token(
  id integer primary key autoincrement,
  token text not null,
  user_id integer not null
);

create index ix_auth_token_id on auth_token(id);
create index ix_auth_token_token_user_id on auth_token(token, user_id);

drop table if exists incoming;
create table incoming(
  id integer primary key autoincrement,
  user_id integer not null,
  date text not null,
  sum integer no null,
  text text not null
);

create index ix_incoming_id on incoming(id);
create index ix_incoming_user_id on incoming(user_id);
