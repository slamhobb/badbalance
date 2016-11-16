update spending
	set user_id     = :user_id,
		date        = :date,
		sum         = :sum,
		text        = :text,
		category    = :category
    where id = :id;
