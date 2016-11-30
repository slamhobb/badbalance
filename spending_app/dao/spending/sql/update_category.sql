update category
	set name = :name
    where id = :id
		and user_id = :user_id;
