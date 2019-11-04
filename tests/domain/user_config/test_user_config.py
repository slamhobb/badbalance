from spending_app.domain.user_config import UserConfig


def test_user_context_init():
    user_config = UserConfig(default_page_fast_spending=True)

    assert user_config.default_page_fast_spending == True


def test_user_context_from_dict():
    user_config = UserConfig.from_dict(
        {
            'default_page_fast_spending': True,
        }
    )
    assert user_config.default_page_fast_spending == True


def test_user_context_to_dict():
    user_config = UserConfig(default_page_fast_spending=True)
    adict = user_config.to_dict()

    expected_dict = {
        'default_page_fast_spending': True,
    }

    assert adict == expected_dict
