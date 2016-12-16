import inject

import bcrypt
from spending_app.domain.user import User
from spending_app.dao.user.user import UserDao


class RegistrationService:
    user_dao = inject.attr(UserDao)

    def register_user(self, user_data):
        if self.user_dao.get_by_login(user_data.login) is not None:
            return None, "Логин уже занят"

        hash_passwd = bcrypt.hashpw(bytes(user_data.password, 'utf-8'), bcrypt.gensalt())

        user = User()
        user.login = user_data.login
        user.password = str(hash_passwd, 'utf-8')
        self.user_dao.save(user)

        return user.id, None
