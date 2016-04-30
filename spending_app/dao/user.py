from spending_app.dao.base import BaseDao
from spending_app.domain.user import User


class UserDao(BaseDao):
    def get_by_id(self, user_id):
        result = self.query_one('select id, login, password from User where id = :user_id',
                                dict(user_id=user_id))
        return User(result)

    def get_by_login(self, login):
        result = self.query_one('select id, login, password from User where login = :login', dict(login=login))
        return User(result)

    def save(self, user):
        if user.id is None or user.id == 0:
            user.id = self.execute("""
                insert into User(login, password)
                    values (:login, :password)""", user.to_primitive())
        else:
            self.execute("""
                update User
                    set login = :login,
                        password = :password
                    where id = :id""", user.to_primitive())
