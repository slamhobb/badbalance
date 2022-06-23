select
	s.id,
	s.name,
	s.data
	from coop_spending as s
		join coop_spending_user as u on
			s.id = u.coop_spending_id
	where s.id = :coop_id
		and u.user_id = :user_id;
