class UserData(object):
    def __init__(self, login, password):
        self.login = login
        self.password = password

    @classmethod
    def from_dict(cls, adict):
        user_data = UserData(
            login=adict['login'],
            password=adict['password']
        )

        return user_data


class User(object):
    def __init__(self, id, login, password):
        self.id = id
        self.login = login
        self.password = password

    @classmethod
    def from_dict(cls, adict):
        user = User(
            id=adict['id'],
            login=adict['login'],
            password=adict['password']
        )

        return user

    def to_dict(self):
        adict = {
            'id': self.id,
            'login': self.login,
            'password': self.password
        }

        return adict
