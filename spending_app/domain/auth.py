class AuthToken(object):
    """Token for user id"""

    def __init__(self, token, user_id):
        self.token = token
        self.user_id = user_id

    @classmethod
    def from_dict(cls, adict):
        auth_token = AuthToken(
            token=adict['token'],
            user_id=adict['user_id']
        )

        return auth_token

    def to_dict(self):
        adict = {
            'token': self.token,
            'user_id': self.user_id
        }

        return adict


class UserContext(object):
    """User context for authenticated user"""

    def __init__(self, user_id, login):
        self.user_id = user_id
        self.login = login

    @classmethod
    def from_dict(cls, adict):
        user_context = UserContext(
            user_id=adict['user_id'],
            login=adict['login']
        )

        return user_context

    def to_dict(self):
        adict = {
            'user_id': self.user_id,
            'login': self.login
        }

        return adict
