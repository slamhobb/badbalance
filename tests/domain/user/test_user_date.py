from spending_app.domain.user import UserData


def test_user_data_init():
    user_data = UserData(login='virt@town.com', password='zxcvbnm')

    assert user_data.login == 'virt@town.com'
    assert user_data.password == 'zxcvbnm'


def test_user_data_from_dict():
    user_data = UserData.from_dict(
        {
            'login': 'virt@town.com',
            'password': 'zxcvbnm'
        }
    )
    assert user_data.login == 'virt@town.com'
    assert user_data.password == 'zxcvbnm'
