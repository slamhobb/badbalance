import inject

import bcrypt
from spending_app.domain.user import User
from spending_app.dao.user.user_dao import UserDao


class RegistrationService:
    user_dao = inject.attr(UserDao)

    def register_user(self, user_data):
        login = user_data.login
        password = user_data.password

        if self.user_dao.get_by_login(login) is not None:
            return None, "Логин уже занят"

        hash_passwd = bcrypt.hashpw(bytes(password, 'utf-8'), bcrypt.gensalt())

        user = User(0, login, str(hash_passwd, 'utf-8'))
        self.user_dao.save(user)

        return user.id, None
