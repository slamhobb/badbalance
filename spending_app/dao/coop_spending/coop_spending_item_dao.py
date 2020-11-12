from spending_app.dao.base_dao import BaseDao
from spending_app.domain.coop_spending import CoopSpendingItem


class CoopSpendingItemDao(BaseDao):
    def __init__(self):
        super().__init__('/coop_spending/sql/')

    def get_items_by_coop_id(self, coop_spending_id, user_id):
        sql = self.get_sql('get_coop_items_by_coop_id.sql')
        return self.query_all(CoopSpendingItem, sql,
                              dict(coop_spending_id=coop_spending_id, user_id=user_id))
