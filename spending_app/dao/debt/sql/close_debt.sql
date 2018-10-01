update debt
	set closed = 1
	where id = :id
		and user_id = :user_id;
