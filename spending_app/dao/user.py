from spending_app.dao.base import BaseDao
from spending_app.domain.user import User


class UserDao(BaseDao):
    def __init__(self):
        super().__init__('/sql/user/')

    def get_by_id(self, user_id):
        sql = self.get_sql('get_by_id.sql')
        result = self.query_one(sql, dict(user_id=user_id))
        return User(result)

    def get_by_login(self, login):
        sql = self.get_sql('get_by_login.sql')
        result = self.query_one(sql, dict(login=login))
        return User(result)

    def save(self, user):
        if user.id is None or user.id == 0:
            sql = self.get_sql('insert.sql')
            user.id = self.execute(sql, user.to_primitive())
        else:
            sql = self.get_sql('update.sql')
            self.execute(sql, user.to_primitive())
