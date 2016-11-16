import inject
import uuid

from spending_app.dao.user.user import UserDao
from spending_app.dao.auth.auth import AuthTokenDao
from spending_app.domain.auth import AuthToken
from spending_app.infrastructure.auth import UserContext


class AuthService:
    user_dao = inject.attr(UserDao)
    token_dao = inject.attr(AuthTokenDao)

    def authenticate(self, login, password):
        user = self.user_dao.get_by_login(login)

        if user.password != password:
            return None

        auth_token = AuthToken()
        auth_token.token = uuid.uuid1().hex
        auth_token.user_id = user.id

        self.token_dao.insert_token(auth_token)

        return auth_token.token

    def get_user_context(self, token):
        context = self.token_dao.get_user_context_by_token(token)
        if context is None:
            return None
        return UserContext(context.user_id, context.login)
