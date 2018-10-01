select
	i.id,
	i.debt_id,
	i.date,
	i.sum,
	i.text
	from debt_item as i
		inner join debt as d on
			i.debt_id = d.id
	where d.user_id = :user_id
		and d.closed = 0;
