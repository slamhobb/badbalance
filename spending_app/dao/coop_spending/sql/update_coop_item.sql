update coop_spending_item
	set date = :date,
		text = :text,
		data = :data
	where id = :id;
