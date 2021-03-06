from spending_app.dao.base_dao import BaseDao
from spending_app.domain.auth import AuthUser


class AuthTokenDao(BaseDao):
    def __init__(self):
        super().__init__('/auth/sql/')

    def get_auth_user_by_token(self, token):
        sql = self.get_sql('get_user_by_token.sql')
        return self.query_one(AuthUser, sql, dict(token=token))

    def insert_token(self, auth_token):
        sql = self.get_sql('insert_token.sql')
        self.execute(sql, auth_token.to_dict())

    def delete_token(self, token, user_id):
        sql = self.get_sql('delete_token.sql')
        self.execute(sql, dict(token=token, user_id=user_id))

    def delete_all(self):
        sql = self.get_sql('delete_all.sql')
        self.execute(sql, {})
