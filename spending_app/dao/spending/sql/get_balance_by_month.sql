select
	sum(sum) as sum
	from spending
	where user_id = :user_id
		and abs(strftime('%Y', date)) = :year
		and abs(strftime('%m', date)) = :month
	group by user_id