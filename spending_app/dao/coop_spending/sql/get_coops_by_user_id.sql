select
	cs.id,
	cs.name,
	cs.data
	from coop_spending as cs
		join coop_spending_user as csu on
			cs.id = csu.coop_spending_id
	where csu.user_id = :user_id;
