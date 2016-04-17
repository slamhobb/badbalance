from spending_app.dao.base import BaseDao
from spending_app.domain.user import User


class UserDao(BaseDao):
    def get_by_id(self, id):
        result = self.query_one("select id, login, password from User where id = :id", dict(id=id))
        return User(result)

    def get_by_login(self, login):
        result = self.query_one('select id, login, password from User where login = :login', dict(login=login))
        return User(result)
