class Statistic(object):
    def __init__(self, sum, category):
        self.sum = sum
        self.category = category

    @classmethod
    def from_dict(cls, adict):
        statistic = Statistic(
            sum=adict['sum'],
            category=adict['category']
        )

        return statistic

    def to_dict(self):
        adict = {
            'sum': self.sum,
            'category': self.category
        }

        return adict
