import json

from spending_app.domain.user_config import UserConfig


def test_user_config_init():
    user_config = UserConfig(user_id=9, separate_category_ids=[1, 5, 8], spending_goal=877)

    assert user_config.user_id == 9
    assert user_config.separate_category_ids == [1, 5, 8]
    assert user_config.spending_goal == 877


def test_user_config_from_dict():
    user_config = UserConfig.from_dict(
        {
            'user_id': 9,
            'data': json.dumps(
                {
                    'separate_category_ids': [1, 5, 8],
                    'spending_goal': 877
                }
            )
        }
    )
    assert user_config.user_id == 9
    assert user_config.separate_category_ids == [1, 5, 8]
    assert user_config.spending_goal == 877


def test_user_config_from_empty_dict():
    user_config = UserConfig.from_dict(
        {
            'user_id': 9,
            'data': json.dumps({})
        }
    )
    assert user_config.user_id == 9
    assert user_config.separate_category_ids == []
    assert user_config.spending_goal == 0


def test_user_config_to_dict():
    user_config = UserConfig(user_id=9, separate_category_ids=[1, 5, 8], spending_goal=877)
    adict = user_config.to_dict()

    expected_dict = {
        'user_id': 9,
        'data': json.dumps(
            {
                'separate_category_ids': [1, 5, 8],
                'spending_goal': 877
            }
        )
    }

    assert adict == expected_dict


def test_user_config_to_web_dict():
    user_config = UserConfig(user_id=9, separate_category_ids=[1, 5, 8], spending_goal=877)
    adict = user_config.to_web_dict()

    expected_dict = {
        'separate_category_ids': [1, 5, 8],
        'spending_goal': 877
    }

    assert adict == expected_dict
