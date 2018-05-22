from spending_app.domain.category import CategoryList


def test_category_list_init():
    category_list = CategoryList(id=78, name='health')

    assert category_list.id == 78
    assert category_list.name == 'health'


def test_category_list_from_dict():
    category_list = CategoryList.from_dict(
        {
            'id': 78,
            'name': 'health'
        }
    )
    assert category_list.id == 78
    assert category_list.name == 'health'


def test_category_list_to_dict():
    category_list = CategoryList(id=78, name='health')
    adict = category_list.to_dict()

    expected_dict = {
        'id': 78,
        'name': 'health'
    }

    assert adict == expected_dict
