from datetime import date

from spending_app.domain.debt_domain import DebtItem


def test_debt_init():
    debt = DebtItem(id=8, debt_id=3, date=date(2018, 2, 2), sum=155, text='shop')

    assert debt.id == 8
    assert debt.debt_id == 3
    assert debt.date == '2018-02-02'
    assert debt.sum == 155
    assert debt.text == 'shop'


def test_debt_int_date_str():
    debt = DebtItem(id=8, debt_id=3, date='2018-02-02', sum=155, text='shop')

    assert debt.id == 8
    assert debt.debt_id == 3
    assert debt.date == '2018-02-02'
    assert debt.sum == 155
    assert debt.text == 'shop'


def test_debt_to_dict():
    debt = DebtItem.from_dict(
        {
            'id': 8,
            'debt_id': 3,
            'date': date(2018, 2, 2),
            'sum': 155,
            'text': 'shop'
        }
    )

    assert debt.id == 8
    assert debt.debt_id == 3
    assert debt.date == '2018-02-02'
    assert debt.sum == 155
    assert debt.text == 'shop'


def test_debt_from_dict():
    debt = DebtItem(id=8, debt_id=3, date=date(2018, 2, 2), sum=155, text='shop')
    adict = debt.to_dict()

    expeceted_dict = {
        'id': 8,
        'debt_id': 3,
        'date': '2018-02-02',
        'sum': 155,
        'text': 'shop'
    }

    assert adict == expeceted_dict
