from datetime import datetime

from spending_app.domain.incoming import Incoming


def test_incoming_init():
    incoming = Incoming(id=81, user_id=9, date=datetime(2018, 4, 20), sum=67, text='work')

    assert incoming.id == 81
    assert incoming.user_id == 9
    assert incoming.date == '2018-04-20'
    assert incoming.sum == 67
    assert incoming.text == 'work'


def test_incoming_from_dict():
    incoming = Incoming.from_dict(
        {
            'id': 81,
            'user_id': 9,
            'date': datetime(2018, 4, 20),
            'sum': 67,
            'text': 'work'
        }
    )
    assert incoming.id == 81
    assert incoming.user_id == 9
    assert incoming.date == '2018-04-20'
    assert incoming.sum == 67
    assert incoming.text == 'work'


def test_incoming_to_dict():
    incoming = Incoming(id=81, user_id=9, date=datetime(2018, 4, 20), sum=67, text='work')
    adict = incoming.to_dict()

    expected_dict = {
        'id': 81,
        'user_id': 9,
        'date': '2018-04-20',
        'sum': 67,
        'text': 'work'
    }

    assert adict == expected_dict
