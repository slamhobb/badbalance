import datetime

class Debt:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    @classmethod
    def from_dict(cls, adict):
        return Debt(
            id=adict['id'],
            name=adict['name']
        )

    def to_dict(self):
        adict = {
            'id': self.id,
            'name': self.name
        }

        return adict

class DebtItem:
    def __init__(self, id, debt_id, date, sum, text):
        self.id = id
        self.debt_id = debt_id
        self.date = date.strftime('%Y-%m-%d') if type(date) is datetime.date else date
        self.sum = sum
        self.text = text

    @classmethod
    def from_dict(cls, adict):
        return DebtItem(
            id=adict['id'],
            debt_id=adict['debt_id'],
            date=adict['date'],
            sum=adict['sum'],
            text=adict['text']
        )

    def to_dict(self):
        adict = {
            'id': self.id,
            'debt_id': self.debt_id,
            'date': self.date,
            'sum': self.sum,
            'text': self.text
        }

        return adict
