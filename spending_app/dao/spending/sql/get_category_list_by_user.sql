select
	id,
	name
	from category
	where user_id = 0
		or user_id = :user_id;