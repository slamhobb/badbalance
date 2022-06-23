select
	id,
	coop_spending_id,
	date,
	text,
	data
	from coop_spending_item
	where id = :item_id;
