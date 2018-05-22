from spending_app.domain.spending import SpendingList


def test_spending_list_init():
    spending_list = SpendingList(id=213, date='2018-04-01', sum=30, text='eating', category_id=7)

    assert spending_list.id == 213
    assert spending_list.date == '2018-04-01'
    assert spending_list.sum == 30
    assert spending_list.text == 'eating'
    assert spending_list.category_id == 7


def test_spending_list_to_dict():
    spending_list = SpendingList.from_dict(
        {
            'id': 213,
            'date': '2018-04-01',
            'sum': 30,
            'text': 'eating',
            'category_id': 7
        }
    )

    assert spending_list.id == 213
    assert spending_list.date == '2018-04-01'
    assert spending_list.sum == 30
    assert spending_list.text == 'eating'
    assert spending_list.category_id == 7


def test_speding_list_from_dict():
    spending_list = SpendingList(id=213, date='2018-04-01', sum=30, text='eating', category_id=7)
    adict = spending_list.to_dict()

    expected_dict = {
        'id': 213,
        'date': '2018-04-01',
        'sum': 30,
        'text': 'eating',
        'category_id': 7
    }

    assert adict == expected_dict
