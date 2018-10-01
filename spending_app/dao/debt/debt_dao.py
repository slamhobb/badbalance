from spending_app.dao.base_dao import BaseDao
from spending_app.domain.debt_domain import Debt


class DebtDao(BaseDao):
    def __init__(self):
        super().__init__('/debt/sql/')

    def add(self, user_id, name):
        sql = self.get_sql('create_debt.sql')
        return self.execute(sql, dict(user_id=user_id, name=name))

    def close(self, id, user_id):
        sql = self.get_sql('close_debt.sql')
        return self.execute(sql, dict(id=id, user_id=user_id))

    def delete(self, id, user_id):
        sql = self.get_sql('delete_debt.sql')
        return self.execute(sql, dict(id=id, user_id=user_id))

    def get_by_id(self, id, user_id):
        sql = self.get_sql('get_debt_by_id.sql')
        return self.query_one(Debt, sql, dict(id=id, user_id=user_id))

    def get_by_user_id(self, user_id):
        sql = self.get_sql('get_debts_by_user_id.sql')
        return self.query_all(Debt, sql, dict(user_id=user_id))
