from spending_app.domain.coop_spending import CoopSpendingUser


def test_init():
    coop_spending_user = CoopSpendingUser(id=77, name='Лыжник', avatar='moderator')

    assert coop_spending_user.id == 77
    assert coop_spending_user.name == 'Лыжник'
    assert coop_spending_user.avatar == 'moderator'


def test_from_dict():
    coop_spending_user = CoopSpendingUser.from_dict(
        {
            'id': 77,
            'name': 'Лыжник',
            'avatar': 'moderator'
        }
    )

    assert coop_spending_user.id == 77
    assert coop_spending_user.name == 'Лыжник'
    assert coop_spending_user.avatar == 'moderator'


def test_to_dict():
    coop_spending_user = CoopSpendingUser(id=77, name='Лыжник', avatar='moderator')
    adict = coop_spending_user.to_dict()

    expected_dict = {
        'id': 77,
        'name': 'Лыжник',
        'avatar': 'moderator'
    }

    assert adict == expected_dict
