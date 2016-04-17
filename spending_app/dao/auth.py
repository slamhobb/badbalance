from spending_app.dao.base import BaseDao


class AuthTokenDao(BaseDao):
    def get_user_id_by_token(self, token):
        result = self.query_one('select user_id from auth_token where token = :token', dict(token=token))
        if result is None:
            return None
        return int(result['user_id'])

    def insert_token(self, auth_token):
        self.execute('insert into auth_token(token, user_id) values(:token, :user_id)', auth_token.to_primitive())
