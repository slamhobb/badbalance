from spending_app.domain.cookie_config import CookieConfig


def test_cookie_config_init():
    config = CookieConfig(default_page_fast_spending=True)

    assert config.default_page_fast_spending == True


def test_cookie_config_from_dict():
    config = CookieConfig.from_dict(
        {
            'default_page_fast_spending': True,
        }
    )
    assert config.default_page_fast_spending == True


def test_cookie_config_to_dict():
    config = CookieConfig(default_page_fast_spending=True)
    adict = config.to_dict()

    expected_dict = {
        'default_page_fast_spending': True,
    }

    assert adict == expected_dict
