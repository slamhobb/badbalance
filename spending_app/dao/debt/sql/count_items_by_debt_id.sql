select
	count(0)
	from debt_item as i
		inner join debt as d on
			i.debt_id = d.id
	where d.id = :debt_id
		and d.user_id = :user_id;