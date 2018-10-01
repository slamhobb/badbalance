from spending_app.domain.debt_domain import Debt


def test_debt_init():
    debt = Debt(id=17, name='bank')

    assert debt.id == 17
    assert debt.name == 'bank'


def test_debt_to_dict():
    debt = Debt.from_dict(
        {
            'id': 17,
            'name': 'bank'
        }
    )

    assert debt.id == 17
    assert debt.name == 'bank'


def test_debt_from_dict():
    debt = Debt(id=17, name='bank')
    adict = debt.to_dict()

    expeceted_dict = {
        'id': 17,
        'name': 'bank'
    }

    assert adict == expeceted_dict
