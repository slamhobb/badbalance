from datetime import datetime

from spending_app.domain.spending import Spending


def test_spending_init():
    spending = Spending(id=112, user_id=90, date=datetime(2018, 4, 27), sum=1000, text='shopping', category_id=6)

    assert spending.id == 112
    assert spending.user_id == 90
    assert spending.date == '2018-04-27'
    assert spending.sum == 1000
    assert spending.text == 'shopping'
    assert spending.category_id == 6


def test_spending_from_dict():
    spending = Spending.from_dict(
        {
            'id': 112,
            'user_id': 90,
            'date': datetime(2018, 4, 27),
            'sum': 1000,
            'text': 'shopping',
            'category_id': 6
        }
    )
    assert spending.id == 112
    assert spending.user_id == 90
    assert spending.date == '2018-04-27'
    assert spending.sum == 1000
    assert spending.text == 'shopping'
    assert spending.category_id == 6


def test_spending_to_dict():
    spending = Spending(6, 100, datetime(2018, 4, 27), 98, 'Еда', 20)
    adict = spending.to_dict()

    expected_dict = {
        'id': 6,
        'user_id': 100,
        'date': '2018-04-27',
        'sum': 98,
        'text': "Еда",
        'category_id': 20
    }

    assert adict == expected_dict
