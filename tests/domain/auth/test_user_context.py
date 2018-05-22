from spending_app.domain.auth import UserContext


def test_user_context_init():
    user_context = UserContext(user_id=4, login='diablo@blizzard.com')

    assert user_context.user_id == 4
    assert user_context.login == 'diablo@blizzard.com'


def test_user_context_from_dict():
    user_context = UserContext.from_dict(
        {
            'user_id': 4,
            'login': 'diablo@blizzard.com'
        }
    )
    assert user_context.user_id == 4
    assert user_context.login == 'diablo@blizzard.com'
    
    
def test_user_context_to_dict():
    user_context = UserContext(user_id=4, login='diablo@blizzard.com')
    adict = user_context.to_dict()
    
    expected_dict = {
        'user_id': 4,
        'login': 'diablo@blizzard.com'
    }
    
    assert adict == expected_dict
