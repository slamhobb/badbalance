update incoming
	set date = :date,
		sum = :sum,
		text = :text
	where id = :id
		and user_id = :user_id;
