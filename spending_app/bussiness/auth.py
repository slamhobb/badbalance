import uuid
import bcrypt
import base64
import os

import inject

from spending_app.dao.user.user import UserDao
from spending_app.dao.auth.auth import AuthTokenDao
from spending_app.domain.auth import AuthToken
from spending_app.infrastructure.auth import UserContext


class AuthService:
    user_dao = inject.attr(UserDao)
    token_dao = inject.attr(AuthTokenDao)

    def authenticate(self, login, password):
        user = self.user_dao.get_by_login(login)

        if not user or not self._check_password(password, user.password):
            return None, "Введены не верные логин и пароль"

        auth_token = AuthToken()
        auth_token.token = self._generate_token()
        auth_token.user_id = user.id

        self.token_dao.insert_token(auth_token)

        return auth_token.token, None

    def get_user_context(self, token):
        context = self.token_dao.get_user_context_by_token(token)
        if context is None:
            return None
        return UserContext(context.user_id, context.login)

    @staticmethod
    def _generate_token():
        random_string = base64.b64encode(os.urandom(30))
        return uuid.uuid1().hex + str(random_string, 'utf-8')

    @staticmethod
    def _check_password(password1, password2):
        password1 = bytes(password1, 'utf-8')
        password2 = bytes(password2, 'utf-8')
        return bcrypt.checkpw(password1, password2)