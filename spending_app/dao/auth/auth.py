from spending_app.dao.base import BaseDao
from spending_app.domain.auth import UserContext


class AuthTokenDao(BaseDao):
    def __init__(self):
        super().__init__('/auth/sql/')

    def get_user_context_by_token(self, token):
        sql = self.get_sql('get_user_id_by_token.sql')
        return self.query_one(UserContext, sql, dict(token=token))

    def insert_token(self, auth_token):
        sql = self.get_sql('insert_token.sql')
        self.execute(sql, auth_token.to_primitive())
