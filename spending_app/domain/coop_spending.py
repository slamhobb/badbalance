from typing import List
from dataclasses import dataclass
import json


@dataclass
class CoopSpendingUser:
    id: int
    name: str
    avatar: str

    @classmethod
    def from_dict(cls, adict):
        return CoopSpendingUser(
            id=adict['id'],
            name=adict['name'],
            avatar=adict['avatar']
        )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'avatar': self.avatar
        }


@dataclass
class CoopSpending(object):
    id: int
    name: str
    users: List[CoopSpendingUser]

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
    @classmethod
    def from_dict_web(cls, adict: dict):
        coop_spending = CoopSpending(
            id=adict['id'],
            name=adict['name'],
            users=[CoopSpendingUser.from_dict(user) for user in adict['users']]
        )

        return coop_spending

    # todo: cover tests
    def to_dict_web(self):
        adict = {
            'id': self.id,
            'name': self.name,
            'users': [user.to_dict() for user in self.users]
        }

        return adict


@dataclass
class CoopSpendingDebt:
    user_id: int
    sum: int

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


@dataclass
class CoopSpendingPay:
    user_id: int
    sum: int
    debts: List[CoopSpendingDebt]

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


@dataclass
class CoopSpendingTransfer:
    from_user_id: int
    to_user_id: int
    sum: int

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


@dataclass
class CoopSpendingItem:
    id: int
    coop_spending_id: int
    date: str
    text: str
    type: str
    pays: List[CoopSpendingPay]
    transfers: List[CoopSpendingTransfer]

    @classmethod
    def from_dict(cls, adict):
        data = json.loads(adict['data'])

        return CoopSpendingItem(
            id=adict['id'],
            coop_spending_id=adict['coop_spending_id'],
            date=adict['date'],
            text=adict['text'],
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
            'text': self.text,
            'data': json.dumps(data)
        }

    # todo: cover test
    @classmethod
    def from_dict_web(cls, adict):
        return CoopSpendingItem(
            id=adict['id'],
            coop_spending_id=adict['coop_spending_id'],
            date=adict['date'],
            text=adict['text'],
            type=adict['type'],
            pays=[CoopSpendingPay.from_dict(pay) for pay in adict['pays']],
            transfers=[CoopSpendingTransfer.from_dict(t) for t in adict['transfers']]
        )

    # todo: cover tests
    def to_dict_web(self):
        return {
            'id': self.id,
            'coop_spending_id': self.coop_spending_id,
            'date': self.date,
            'text': self.text,
            'type': self.type,
            'pays': [pay.to_dict() for pay in self.pays],
            'transfers': [t.to_dict() for t in self.transfers]
        }
