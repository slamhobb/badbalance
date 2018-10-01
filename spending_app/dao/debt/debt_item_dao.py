from spending_app.dao.base_dao import BaseDao
from spending_app.domain.debt_domain import DebtItem


class DebtItemDao(BaseDao):
    def __init__(self):
        super().__init__('/debt/sql/')

    def add_item(self, debt_item):
        sql = self.get_sql('add_debt_item.sql')
        return self.execute(sql, debt_item.to_dict())

    def get_items_by_user_id(self, user_id):
        sql = self.get_sql('get_debt_items_by_user_id.sql')
        return self.query_all(DebtItem, sql, dict(user_id=user_id))

    def delete_item(self, id):
        sql = self.get_sql('delete_debt_item.sql')
        self.execute(sql, dict(id=id))
