select
	a.user_id,
	u.login
	from auth_token as a
		inner join User as u on
			a.user_id = u.id
	where a.token = :token;
