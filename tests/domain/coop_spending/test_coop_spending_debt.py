from spending_app.domain.coop_spending import CoopSpendingDebt


def test_init():
    model = CoopSpendingDebt(user_id=9, sum=500)

    assert model.user_id == 9
    assert model.sum == 500


def test_from_dict():
    model = CoopSpendingDebt.from_dict(
        {
            'user_id': 9,
            'sum': 500
        }
    )

    assert model.user_id == 9
    assert model.sum == 500


def test_to_dict():
    model = CoopSpendingDebt(user_id=9, sum=500)
    adict = model.to_dict()

    expected_dict = {
        'user_id': 9,
        'sum': 500
    }

    assert adict == expected_dict
