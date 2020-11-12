from typing import List
from datetime import datetime
import json


class CoopSpendingUser:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

    @classmethod
    def from_dict(cls, adict):
        return CoopSpendingUser(
            id=adict['id'],
            name=adict['name']
        )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }


class CoopSpending(object):
    def __init__(self, id: int, name: str, users: List[CoopSpendingUser]):
        self.id = id
        self.name = name
        self.users = users

    @classmethod
    def from_dict(cls, adict: dict):
        data = json.loads(adict['data'])

        coop_spending = CoopSpending(
            id=adict['id'],
            name=adict['name'],
            users=[CoopSpendingUser.from_dict(user) for user in data['users']]
        )

        return coop_spending

    def to_dict(self):
        data = {
            'users': [user.to_dict() for user in self.users]
        }

        adict = {
            'id': self.id,
            'name': self.name,
            'data': json.dumps(data)
        }

        return adict

    # todo: cover tests
    def to_dict_web(self):
        data = {
            'users': [user.to_dict() for user in self.users]
        }

        adict = {
            'id': self.id,
            'name': self.name,
            'data': data
        }

        return adict


class CoopSpendingDebt:
    def __init__(self, user_id: int, sum: int):
        self.user_id = user_id
        self.sum = sum

    @classmethod
    def from_dict(cls, adict):
        return CoopSpendingDebt(
            user_id=adict['user_id'],
            sum=adict['sum']
        )

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'sum': self.sum
        }


class CoopSpendingPay:
    def __init__(self, user_id: int, sum: int, debts: List[CoopSpendingDebt]):
        self.user_id = user_id
        self.sum = sum
        self.debts = debts

    @classmethod
    def from_dict(cls, adict):
        return CoopSpendingPay(
            user_id=adict['user_id'],
            sum=adict['sum'],
            debts=[CoopSpendingDebt.from_dict(debt) for debt in adict['debts']]
        )

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'sum': self.sum,
            'debts': [debt.to_dict() for debt in self.debts]
        }


class CoopSpendingTransfer:
    def __init__(self, from_user_id: int, to_user_id: int, sum: int):
        self.from_user_id = from_user_id
        self.to_user_id = to_user_id
        self.sum = sum

    @classmethod
    def from_dict(cls, adict):
        return CoopSpendingTransfer(
            from_user_id=adict['from_user_id'],
            to_user_id=adict['to_user_id'],
            sum=adict['sum']
        )

    def to_dict(self):
        return {
            'from_user_id': self.from_user_id,
            'to_user_id': self.to_user_id,
            'sum': self.sum
        }


class CoopSpendingItem:
    def __init__(self, id: int, coop_spending_id: int, date: str, type: str,
                 pays: List[CoopSpendingPay], transfers: List[CoopSpendingTransfer]):
        self.id = id
        self.coop_spending_id = coop_spending_id
        self.date = date
        self.type = type
        self.pays = pays
        self.transfers = transfers

    @classmethod
    def from_dict(cls, adict):
        data = json.loads(adict['data'])

        return CoopSpendingItem(
            id=adict['id'],
            coop_spending_id=adict['coop_spending_id'],
            date=adict['date'],
            type=data['type'],
            pays=[CoopSpendingPay.from_dict(pay) for pay in data['pays']],
            transfers=[CoopSpendingTransfer.from_dict(t) for t in data['transfers']]
        )

    def to_dict(self):
        data = {
            'type': self.type,
            'pays': [pay.to_dict() for pay in self.pays],
            'transfers': [t.to_dict() for t in self.transfers]
        }

        return {
            'id': self.id,
            'coop_spending_id': self.coop_spending_id,
            'date': self.date,
            'data': json.dumps(data)
        }

    # todo: cover test
    @classmethod
    def from_dict_web(cls, adict):
        data = json.loads(adict['data'])

        return CoopSpendingItem(
            id=adict['id'],
            coop_spending_id=adict['coop_spending_id'],
            date=adict['date'].strftime('%Y-%m-%d'),
            type=data['type'],
            pays=[CoopSpendingPay.from_dict(pay) for pay in data['pays']],
            transfers=[CoopSpendingTransfer.from_dict(t) for t in data['transfers']]
        )

    # todo: cover tests
    def to_dict_web(self):
        return {
            'id': self.id,
            'coop_spending_id': self.coop_spending_id,
            'date': self.date,
            'type': self.type,
            'pays': [pay.to_dict() for pay in self.pays],
            'transfers': [t.to_dict() for t in self.transfers]
        }
