select
	sum(sum)    as sum,
	min(c.name) as category
	from spending as s
		inner join category as c on
			s.category_id = c.id
	where s.user_id = :user_id
		and abs(strftime('%Y', date)) = :year
		and abs(strftime('%m', date)) = :month
	group by s.category_id

