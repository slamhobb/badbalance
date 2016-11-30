update spending
	set date     = :date,
		sum      = :sum,
		text     = :text,
		category = :category
    where id = :id
		and :user_id;
