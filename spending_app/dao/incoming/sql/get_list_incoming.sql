select
	id,
	date,
	sum,
	text
	from incoming
	where user_id = :user_id
		and abs(strftime('%Y', date)) = :year
		and abs(strftime('%m', date)) = :month
	order by date desc, id desc;
