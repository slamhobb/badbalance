class Spending(object):

    def __init__(self, id, user_id, date, sum, text, category_id):
        self.id = id
        self.user_id = user_id
        self.date = date.strftime('%Y-%m-%d')
        self.sum = sum
        self.text = text
        self.category_id = category_id

    @classmethod
    def from_dict(cls, adict):
        spending = Spending(
            id=adict['id'],
            user_id=adict['user_id'],
            date=adict['date'],
            sum=adict['sum'],
            text=adict['text'],
            category_id=adict['category_id']
        )

        return spending

    def to_dict(self):
        adict = {
            'id': self.id,
            'user_id': self.user_id,
            'date': self.date,
            'sum': self.sum,
            'text': self.text,
            'category_id': self.category_id
        }

        return adict


class SpendingList(object):

    def __init__(self, id, date, sum, text, category_id):
        self.id = id
        self.date = date
        self.sum = sum
        self.text = text
        self.category_id = category_id

    @classmethod
    def from_dict(cls, adict):
        spending_list = SpendingList(
            id=adict['id'],
            date=adict['date'],
            sum=adict['sum'],
            text=adict['text'],
            category_id=adict['category_id']
        )

        return spending_list

    def to_dict(self):
        adict = {
            'id': self.id,
            'date': self.date,
            'sum': self.sum,
            'text': self.text,
            'category_id': self.category_id
        }

        return adict
