delete from auth_token
	where token=:token
		and user_id=:user_id;
