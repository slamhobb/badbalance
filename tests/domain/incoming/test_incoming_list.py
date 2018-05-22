from spending_app.domain.incoming import IncomingList


def test_incoming_list_init():
    incoming_list = IncomingList(id=23, date='2018-04-15', sum=100, text='hard work')

    assert incoming_list.id == 23
    assert incoming_list.date == '2018-04-15'
    assert incoming_list.sum == 100
    assert incoming_list.text == 'hard work'


def test_incoming_list_from_dict():
    incoming_list = IncomingList.from_dict(
        {
            'id': 23,
            'date': '2018-04-15',
            'sum': 100,
            'text': 'hard work'
        }
    )
    assert incoming_list.id == 23
    assert incoming_list.date == '2018-04-15'
    assert incoming_list.sum == 100
    assert incoming_list.text == 'hard work'


def test_incoming_list_to_dict():
    incoming_list = IncomingList(id=23, date='2018-04-15', sum=100, text='hard work')
    adict = incoming_list.to_dict()

    expected_dict = {
        'id': 23,
        'date': '2018-04-15',
        'sum': 100,
        'text': 'hard work'
    }

    assert adict == expected_dict
