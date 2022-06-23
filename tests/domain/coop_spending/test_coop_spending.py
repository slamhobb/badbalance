import json

from spending_app.domain.coop_spending import CoopSpending
from spending_app.domain.coop_spending import CoopSpendingUser


def test_coop_spending_init():
    coop_spending = CoopSpending(
        id=5,
        name='Домбай 2020',
        users=[
            CoopSpendingUser(id=77, name='Турист', avatar='moderator')
        ]
    )

    assert coop_spending.id == 5
    assert coop_spending.name == 'Домбай 2020'

    assert coop_spending.users[0].id == 77
    assert coop_spending.users[0].name == 'Турист'
    assert coop_spending.users[0].avatar == 'moderator'


def test_coop_spending_from_dict():
    coop_spending = CoopSpending.from_dict(
        {
            'id': 5,
            'name': 'Домбай 2020',
            'data': json.dumps(
                {
                    'users': [
                        {
                            'id': 77,
                            'name': 'Турист',
                            'avatar': 'moderator'
                        }
                    ]
                }
            )
        }
    )

    assert coop_spending.id == 5
    assert coop_spending.name == 'Домбай 2020'

    assert coop_spending.users[0].id == 77
    assert coop_spending.users[0].name == 'Турист'
    assert coop_spending.users[0].avatar == 'moderator'


def test_coop_spending_to_dict():
    coop_spending = CoopSpending(
        id=5,
        name='Домбай 2020',
        users=[
            CoopSpendingUser(id=77, name='Турист', avatar='moderator')
        ]
    )

    adict = coop_spending.to_dict()

    expected_dict = {
        'id': 5,
        'name': 'Домбай 2020',
        'data': json.dumps(
            {
                'users': [
                    {
                        'id': 77,
                        'name': 'Турист',
                        'avatar': 'moderator'
                    }
                ]
            }
        )
    }

    assert adict == expected_dict


def test_coop_spending_to_dict_web():
    coop_spending = CoopSpending(
        id=5,
        name='Домбай 2020',
        users=[
            CoopSpendingUser(77, 'Турист', avatar='moderator')
        ]
    )

    adict = coop_spending.to_dict_web()

    expected_dict = {
        'id': 5,
        'name': 'Домбай 2020',
        'users': [
            {
                'id': 77,
                'name': 'Турист',
                'avatar': 'moderator'
            }
        ]
    }

    assert adict == expected_dict