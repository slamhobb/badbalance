select
	user_id
	from auth_token
	where token = :token;
