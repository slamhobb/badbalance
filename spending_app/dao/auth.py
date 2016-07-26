from spending_app.dao.base import BaseDao


class AuthTokenDao(BaseDao):
    def __init__(self):
        super().__init__('/sql/auth/')

    def get_user_id_by_token(self, token):
        sql = self.get_sql('get_user_id_by_token.sql')
        result = self.query_one(sql, dict(token=token))

        return int(result['user_id'])

    def insert_token(self, auth_token):
        sql = self.get_sql('insert_token.sql')
        self.execute(sql, auth_token.to_primitive())
