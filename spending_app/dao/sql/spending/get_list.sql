select
	id,
	--user_id,
	date,
	sum,
	text,
	category
	from spending
	where user_id = :user_id
	order by date, id;
