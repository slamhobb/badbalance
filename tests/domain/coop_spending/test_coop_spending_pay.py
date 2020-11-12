from spending_app.domain.coop_spending import CoopSpendingPay
from spending_app.domain.coop_spending import CoopSpendingDebt


def test_init():
    model = CoopSpendingPay(user_id=11, sum=2500, debts=[CoopSpendingDebt(user_id=18, sum=500)])

    assert model.user_id == 11
    assert model.sum == 2500
    assert model.debts[0].user_id == 18
    assert model.debts[0].sum == 500


def test_from_dict():
    model = CoopSpendingPay.from_dict(
        {
            'user_id': 11,
            'sum': 2500,
            'debts': [
                {
                    'user_id': 18,
                    'sum': 500
                }
            ]
        }
    )

    assert model.user_id == 11
    assert model.sum == 2500
    assert model.debts[0].user_id == 18
    assert model.debts[0].sum == 500


def test_to_dict():
    model = CoopSpendingPay(user_id=11, sum=2500, debts=[CoopSpendingDebt(user_id=18, sum=500)])
    adict = model.to_dict()

    expected_dict = {
        'user_id': 11,
        'sum': 2500,
        'debts': [
            {
                'user_id': 18,
                'sum': 500
            }
        ]
    }

    assert adict == expected_dict
