from spending_app.dao.base import BaseDao
from spending_app.domain.user import User


class UserDao(BaseDao):
    def __init__(self):
        super().__init__('/user/sql/')

    def get_by_id(self, user_id):
        sql = self.get_sql('get_by_id.sql')
        return self.query_one(User, sql, dict(user_id=user_id))

    def get_by_login(self, login):
        sql = self.get_sql('get_by_login.sql')
        return self.query_one(User, sql, dict(login=login))

    def save(self, user):
        if user.id is None or user.id == 0:
            sql = self.get_sql('insert.sql')
            user.id = self.execute(sql, user.to_primitive())
        else:
            sql = self.get_sql('update.sql')
            self.execute(sql, user.to_primitive())
