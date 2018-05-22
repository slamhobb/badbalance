from spending_app.domain.user import User


def test_user_init():
    user = User(id=34, login='acara@town.com', password='qwerty')

    assert user.id == 34
    assert user.login == 'acara@town.com'
    assert user.password == 'qwerty'


def test_user_from_dict():
    user = User.from_dict(
        {
            'id': 34,
            'login': 'acara@town.com',
            'password': 'qwerty'
        }
    )
    assert user.id == 34
    assert user.login == 'acara@town.com'
    assert user.password == 'qwerty'


def test_user_to_dict():
    user = User(id=34, login='acara@town.com', password='qwerty')
    adict = user.to_dict()

    expected_dict = {
        'id': 34,
        'login': 'acara@town.com',
        'password': 'qwerty'
    }

    assert adict == expected_dict
