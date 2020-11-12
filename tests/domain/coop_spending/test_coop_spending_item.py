from datetime import datetime
import json

from spending_app.domain.coop_spending import CoopSpendingItem
from spending_app.domain.coop_spending import CoopSpendingPay
from spending_app.domain.coop_spending import CoopSpendingTransfer
from spending_app.domain.coop_spending import CoopSpendingDebt


def test_pays_init():
    model = CoopSpendingItem(id=7, coop_spending_id=4, date='2021-01-17', type="pay",
                             pays=[CoopSpendingPay(user_id=11, sum=2500,
                                                   debts=[CoopSpendingDebt(user_id=18, sum=500)])],
                             transfers=[])

    assert model.id == 7
    assert model.coop_spending_id == 4
    assert model.date == '2021-01-17'
    assert model.type == "pay"
    assert model.pays[0].user_id == 11
    assert model.pays[0].sum == 2500
    assert model.pays[0].debts[0].user_id == 18
    assert model.pays[0].debts[0].sum == 500
    assert model.transfers == []


def test_pays_from_dict():
    model = CoopSpendingItem.from_dict(
        {
            'id': 7,
            'coop_spending_id': 4,
            'date': '2021-01-17',
            'data': json.dumps(
                {
                    'type': 'pay',
                    'pays': [
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
                    ],
                    'transfers': []
                }
            )
        }
    )

    assert model.id == 7
    assert model.coop_spending_id == 4
    assert model.date == '2021-01-17'
    assert model.type == "pay"
    assert model.pays[0].user_id == 11
    assert model.pays[0].sum == 2500
    assert model.pays[0].debts[0].user_id == 18
    assert model.pays[0].debts[0].sum == 500
    assert model.transfers == []


def test_pays_to_dict():
    model = CoopSpendingItem(id=7, coop_spending_id=4, date='2021-01-17', type="pay",
                             pays=[CoopSpendingPay(user_id=11, sum=2500,
                                                   debts=[CoopSpendingDebt(user_id=18, sum=500)])],
                             transfers=[])
    adict = model.to_dict()

    expected_dict = {
        'id': 7,
        'coop_spending_id': 4,
        'date': '2021-01-17',
        'data': json.dumps(
            {
                'type': 'pay',
                'pays': [
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
                ],
                'transfers': []
            }
        )
    }

    assert adict == expected_dict


def test_transfers_init():
    model = CoopSpendingItem(id=7, coop_spending_id=4, date='2021-01-17', type="pay",
                             pays=[],
                             transfers=[CoopSpendingTransfer(from_user_id=9, to_user_id=10, sum=250)])

    assert model.id == 7
    assert model.coop_spending_id == 4
    assert model.date == '2021-01-17'
    assert model.type == "pay"
    assert model.pays == []
    assert model.transfers[0].from_user_id == 9
    assert model.transfers[0].to_user_id == 10
    assert model.transfers[0].sum == 250


def test_transfers_from_dict():
    model = CoopSpendingItem.from_dict(
        {
            'id': 7,
            'coop_spending_id': 4,
            'date': '2021-01-17',
            'data': json.dumps(
                {
                    'type': 'pay',
                    'pays': [],
                    'transfers': [
                        {
                            'from_user_id': 9,
                            'to_user_id': 10,
                            'sum': 250
                        }
                    ]
                }
            )
        }
    )

    assert model.id == 7
    assert model.coop_spending_id == 4
    assert model.date == '2021-01-17'
    assert model.type == "pay"
    assert model.pays == []
    assert model.transfers[0].from_user_id == 9
    assert model.transfers[0].to_user_id == 10
    assert model.transfers[0].sum == 250


def test_transfers_to_dict():
    model = CoopSpendingItem(id=7, coop_spending_id=4, date='2021-01-17', type="pay",
                             pays=[],
                             transfers=[CoopSpendingTransfer(from_user_id=9, to_user_id=10, sum=250)])
    adict = model.to_dict()

    expected_dict = {
        'id': 7,
        'coop_spending_id': 4,
        'date': '2021-01-17',
        'data': json.dumps(
            {
                'type': 'pay',
                'pays': [],
                'transfers': [
                    {
                        'from_user_id': 9,
                        'to_user_id': 10,
                        'sum': 250
                    }
                ]
            }
        )
    }

    assert adict == expected_dict
