from spending_app.dao.base_dao import BaseDao
from spending_app.domain.coop_spending import CoopSpending


class CoopSpendingDao(BaseDao):
    def __init__(self):
        super().__init__('/coop_spending/sql/')

    def get_by_user_id(self, user_id):
        sql = self.get_sql('get_coops_by_user_id.sql')
        return self.query_all(CoopSpending, sql, dict(user_id=user_id))
