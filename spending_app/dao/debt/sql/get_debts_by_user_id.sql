select
	id,
	name
	from debt
	where user_id = :user_id
		and closed = 0;