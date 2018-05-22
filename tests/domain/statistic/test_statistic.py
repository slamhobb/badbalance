from spending_app.domain.statistic import Statistic


def test_statistic_init():
    statistic = Statistic(sum=236, category='travel')

    assert statistic.sum == 236
    assert statistic.category == 'travel'


def test_statistic_from_dict():
    statistic = Statistic.from_dict(
        {
            'sum': 236,
            'category': 'travel'
        }
    )
    assert statistic.sum == 236
    assert statistic.category == 'travel'


def test_statistic_to_dict():
    statistic = Statistic(sum=236, category='travel')
    adict = statistic.to_dict()

    expected_dict = {
        'sum': 236,
        'category': 'travel'
    }

    assert adict == expected_dict