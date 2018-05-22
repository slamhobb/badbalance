from spending_app.domain.category import Category


def test_category_init():
    category = Category(id=56, user_id=9, name='clothing')

    assert category.id == 56
    assert category.user_id == 9
    assert category.name == 'clothing'


def test_category_from_dict():
    category = Category.from_dict(
        {
            'id': 56,
            'user_id': 9,
            'name': 'clothing'
        }
    )
    assert category.id == 56
    assert category.user_id == 9
    assert category.name == 'clothing'


def test_category_to_dict():
    category = Category(id=56, user_id=9, name='clothing')
    adict = category.to_dict()

    expected_dict = {
        'id': 56,
        'user_id': 9,
        'name': 'clothing'
    }

    assert adict == expected_dict
