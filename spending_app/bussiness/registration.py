import inject

from spending_app.dao.user.user import UserDao


class RegistrationService:
    user_dao = inject.attr(UserDao)

    def register_user(self, user):
        self.user_dao.save(user)
        return user.id
