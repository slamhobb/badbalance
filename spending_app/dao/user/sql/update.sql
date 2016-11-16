update User
    set login = :login,
        password = :password
    where id = :id;
