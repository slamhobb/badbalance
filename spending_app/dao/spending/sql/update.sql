update spending
	set date        = :date,
		sum         = :sum,
		text        = :text,
		category_id = :category_id
    where id = :id
		and user_id = :user_id;
