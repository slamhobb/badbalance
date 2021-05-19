insert into user_config(
	user_id,
	data)
	values(
	   :user_id,
	   :data)
	on conflict(user_id) do update
		set data = excluded.data;
