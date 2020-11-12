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
create index ix_spending_user_id_date on spending(user_id, date);


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
create unique index ux_auth_token_token_user_id on auth_token(token, user_id);


drop table if exists incoming;
create table incoming(
  id integer primary key autoincrement,
  user_id integer not null,
  date text not null,
  sum integer no null,
  text text not null
);

create index ix_incoming_id on incoming(id);
create index ix_incoming_user_id_date on incoming(user_id, date);


drop table if exists debt;
create table debt(
  id integer primary key autoincrement,
  user_id integer not null,
  name text not null,
  closed boolean not null
);

create index ix_debt_id on debt(id);
create index ix_debt_user_id on debt(user_id);


drop table if exists debt_item;
create table debt_item(
  id integer primary key autoincrement,
  debt_id integer not null,
  date text not null,
  sum integer not null,
  text text not null
);

create index ix_debt_item_id on debt_item(id);
create index ix_debt_item_debt_id on debt_item(debt_id);


drop table if exists user_config;
create table user_config(
    user_id int not null primary key,
    data text not null
);

create index ix_user_config_user_id on user_config(user_id);


drop table if exists coop_spending;
create table coop_spending(
    id integer primary key autoincrement,
    name text not null,
    data text not null
);

create index ix_coop_spending_id on coop_spending(id);


drop table if exists coop_spending_user;
create table coop_spending_user(
    id integer primary key autoincrement,
    coop_spending_id integer not null,
    user_id integer not null
);

create index ix_coop_spending_user_id on coop_spending_user(id);
create index ix_coop_spending_user_user_id on coop_spending_user(user_id);


drop table if exists coop_spending_item;
create table coop_spending_item(
    id integer primary key autoincrement,
    coop_spending_id integer not null,
    date text not null,
    data text not null
);

create index ix_coop_spending_item_id on coop_spending_item(id);
create index ix_coop_spending_item_coop_spending_id on coop_spending_item(coop_spending_id);
