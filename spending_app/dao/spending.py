from spending_app.dao.base import BaseDao
from spending_app.domain.spending import Spending


class SpendingDao(BaseDao):
    def __init__(self):
        super().__init__('/sql/spending/')

    def get_list_by_month_and_year(self, user_id, month, year):
        sql = self.get_sql('get_list_by_month_and_year.sql')
        result = self.query_all(sql, dict(user_id=user_id, month=month, year=year))

        return [Spending(r) for r in result]

    def get_list(self, user_id):
        sql = self.get_sql('get_list.sql')
        result = self.query_all(sql, dict(user_id=user_id))
        return [Spending(r) for r in result]

    def add(self, spending):
        sql = self.get_sql('add.sql')
        self.execute(sql, spending.to_primitive())

    def update(self, spending):
        sql = self.get_sql('update.sql')
        self.execute(sql, spending.to_primitive())
