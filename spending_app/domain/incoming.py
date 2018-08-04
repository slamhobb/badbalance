class Incoming(object):

    def __init__(self, id, user_id, date, sum, text):
        self.id = id
        self.user_id = user_id
        self.date = date.strftime('%Y-%m-%d')
        self.sum = sum
        self.text = text

    @classmethod
    def from_dict(cls, adict):
        incoming = Incoming(
            id=adict['id'],
            user_id=adict['user_id'],
            date=adict['date'],
            sum=adict['sum'],
            text=adict['text']
        )

        return incoming

    def to_dict(self):
        adict = {
            'id': self.id,
            'user_id': self.user_id,
            'date': self.date,
            'sum': self.sum,
            'text': self.text
        }

        return adict


class IncomingList(object):

    def __init__(self, id, date, sum, text):
        self.id = id
        self.date = date
        self.sum = sum
        self.text = text

    @classmethod
    def from_dict(cls, adict):
        incoming_list = IncomingList(
            id=adict['id'],
            date=adict['date'],
            sum=adict['sum'],
            text=adict['text']
        )

        return incoming_list

    def to_dict(self):
        adict = {
            'id': self.id,
            'date': self.date,
            'sum': self.sum,
            'text': self.text
        }

        return adict
