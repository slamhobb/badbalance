select
	id,
	login,
	password
	from User
	where login = :login;
