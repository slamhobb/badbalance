from spending_app.domain.coop_spending import CoopSpendingTransfer


def test_init():
    model = CoopSpendingTransfer(from_user_id=9, to_user_id=10, sum=250)

    assert model.from_user_id == 9
    assert model.to_user_id == 10
    assert model.sum == 250


def test_from_dict():
    model = CoopSpendingTransfer.from_dict(
        {
            'from_user_id': 9,
            'to_user_id': 10,
            'sum': 250
        }
    )

    assert model.from_user_id == 9
    assert model.to_user_id == 10
    assert model.sum == 250


def test_to_dict():
    model = CoopSpendingTransfer(from_user_id=9, to_user_id=10, sum=250)
    adict = model.to_dict()

    expected_dict = {
        'from_user_id': 9,
        'to_user_id': 10,
        'sum': 250
    }

    assert adict == expected_dict
