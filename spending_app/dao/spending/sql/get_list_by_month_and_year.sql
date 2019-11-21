select
	id,
	date,
	sum,
	text,
	category_id
	from spending
	where user_id = :user_id
		and abs(strftime('%Y', date)) = :year
		and abs(strftime('%m', date)) = :month;
