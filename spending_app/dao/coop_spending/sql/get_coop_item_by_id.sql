select
	i.id,
	i.coop_spending_id,
	i.date,
	i.text,
	i.data
	from coop_spending_item as i
		join coop_spending_user as u on
			i.coop_spending_id = u.coop_spending_id
	where i.coop_spending_id = :coop_id
		and u.user_id = :user_id;
