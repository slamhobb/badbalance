from spending_app.dao.base import BaseDao
from spending_app.domain.spending import SpendingList
from spending_app.domain.statistic import Statistic


class SpendingDao(BaseDao):
    def __init__(self):
        super().__init__('/spending/sql/')

    def get_list_by_month(self, user_id, year, month):
        sql = self.get_sql('get_list_by_month_and_year.sql')
        return self.query_all(SpendingList, sql, dict(user_id=user_id, year=year, month=month))

    def add(self, spending):
        sql = self.get_sql('add.sql')
        return self.execute(sql, spending.to_primitive())

    def update(self, spending):
        sql = self.get_sql('update.sql')
        self.execute(sql, spending.to_primitive())

    def delete(self, spend_id, user_id):
        sql = self.get_sql('delete.sql')
        self.execute(sql, dict(id=spend_id, user_id=user_id))

    def get_balance_by_month(self, user_id, year, month):
        sql = self.get_sql('get_balance_by_month.sql')
        result = self.query_one_field(int, sql, dict(user_id=user_id, year=year, month=month))
        return result or 0

    def get_statistic(self, user_id, year, month):
        sql = self.get_sql('statistic_by_user.sql')
        return self.query_all(Statistic, sql, dict(user_id=user_id, year=year, month=month))
