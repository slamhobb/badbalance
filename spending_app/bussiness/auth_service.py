import uuid
import bcrypt
import base64
import os

import inject

from spending_app.infrastructure.cache import Cache
from spending_app.dao.user.user_dao import UserDao
from spending_app.dao.auth.auth_token_dao import AuthTokenDao
from spending_app.domain.auth import AuthToken
from spending_app.domain.auth import UserContext


class AuthService:
    cache = inject.attr(Cache)
    user_dao = inject.attr(UserDao)
    token_dao = inject.attr(AuthTokenDao)

    def authenticate(self, login, password):
        user = self.user_dao.get_by_login(login)

        if not user or not self._check_password(password, user.password):
            return None, "Введены неверные логин и пароль"

        auth_token = AuthToken(token=self._generate_token(), user_id=user.id)

        self.token_dao.insert_token(auth_token)

        return auth_token.token, None

    def get_user_context(self, token):
        if token is None:
            return UserContext(None, None, False)

        auth_user = self._get_auth_user(token)

        if auth_user is None:
            return UserContext(None, None, False)

        return UserContext(auth_user.user_id, auth_user.login, True)

    def logout(self, token, user_id):
        self.token_dao.delete_token(token, user_id)

    def _get_auth_user(self, token):
        auth_user = self.cache.get_value(token)

        if auth_user is not None:
            return auth_user

        auth_user = self.token_dao.get_auth_user_by_token(token)

        if auth_user is None:
            return None

        self.cache.set_value(token, auth_user)

        return auth_user

    @staticmethod
    def _generate_token():
        random_string = base64.b64encode(os.urandom(30))
        return uuid.uuid1().hex + str(random_string, 'utf-8')

    @staticmethod
    def _check_password(password1, password2):
        password1 = bytes(password1, 'utf-8')
        password2 = bytes(password2, 'utf-8')

        try:
            return bcrypt.checkpw(password1, password2)
        except ValueError:
            return False
