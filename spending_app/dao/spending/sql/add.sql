insert into spending(
	user_id,
	date,
	sum,
	text,
	category_id)
    values(
	    :user_id,
	    :date,
	    :sum,
	    :text,
	    :category_id);
