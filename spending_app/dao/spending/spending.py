from spending_app.dao.base import BaseDao
from spending_app.domain.spending import SpendingList
from spending_app.domain.statistic import Statistic


class SpendingDao(BaseDao):
    def __init__(self):
        super().__init__('/spending/sql/')

    def get_list_by_month(self, user_id, year, month):
        sql = self.get_sql('get_list_by_month_and_year.sql')
        result = self.query_all(sql, dict(user_id=user_id, year=year, month=month))
        return [SpendingList(r) for r in result]

    def get_list(self, user_id):
        sql = self.get_sql('get_list.sql')
        result = self.query_all(sql, dict(user_id=user_id))
        return [SpendingList(r) for r in result]

    def add(self, spending):
        sql = self.get_sql('add.sql')
        self.execute(sql, spending.to_primitive())

    def update(self, spending):
        sql = self.get_sql('update.sql')
        self.execute(sql, spending.to_primitive())

    def delete(self, spend_id, user_id):
        sql = self.get_sql('delete.sql')
        self.execute(sql, dict(id=spend_id, user_id=user_id))

    def get_balance_by_month(self, user_id, year, month):
        sql = self.get_sql('get_balance_by_month.sql')
        result = self.query_all(sql, dict(user_id=user_id, year=year, month=month))
        if len(result) == 0:
            return 0
        return int(result[0]['sum'])

    def get_statistic(self, user_id, year, month):
        sql = self.get_sql('statistic_by_user.sql')
        result = self.query_all(sql, dict(user_id=user_id, year=year, month=month))
        return [Statistic(r) for r in result]
