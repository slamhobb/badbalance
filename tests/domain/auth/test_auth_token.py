from spending_app.domain.auth import AuthToken


def test_auth_token_init():
    auth_token = AuthToken(token='grisvold', user_id=56)

    assert auth_token.token == 'grisvold'
    assert auth_token.user_id == 56


def test_auth_token_from_dict():
    auth_token = AuthToken.from_dict(
        {
            'token': 'grisvold',
            'user_id': 56
        }
    )
    assert auth_token.token == 'grisvold'
    assert auth_token.user_id == 56


def test_auth_token_to_dict():
    auth_token = AuthToken(token='grisvold', user_id=56)
    adict = auth_token.to_dict()

    expected_dict = {
        'token': 'grisvold',
        'user_id': 56
    }

    assert expected_dict == adict