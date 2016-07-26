insert into spending(
	user_id,
	date,
	sum,
	text,
	category)
    values(
	    :user_id,
	    :date,
	    :sum,
	    :text,
	    :category);
