from spending_app.domain.auth import AuthUser


def test_user_context_init():
    auth_user = AuthUser(user_id=4, login='diablo@blizzard.com')

    assert auth_user.user_id == 4
    assert auth_user.login == 'diablo@blizzard.com'


def test_user_context_from_dict():
    auth_user = AuthUser.from_dict(
        {
            'user_id': 4,
            'login': 'diablo@blizzard.com'
        }
    )
    assert auth_user.user_id == 4
    assert auth_user.login == 'diablo@blizzard.com'
    
    
def test_user_context_to_dict():
    auth_user = AuthUser(user_id=4, login='diablo@blizzard.com')
    adict = auth_user.to_dict()
    
    expected_dict = {
        'user_id': 4,
        'login': 'diablo@blizzard.com'
    }
    
    assert adict == expected_dict
