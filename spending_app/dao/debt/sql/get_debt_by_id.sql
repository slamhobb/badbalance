select
	id,
	name
	from debt
	where id = :id
		and user_id = :user_id;