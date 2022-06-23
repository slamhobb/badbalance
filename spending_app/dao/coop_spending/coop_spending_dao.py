from typing import List

from spending_app.dao.base_dao import BaseDao
from spending_app.domain.coop_spending import CoopSpending


class CoopSpendingDao(BaseDao):
    def __init__(self):
        super().__init__('/coop_spending/sql/')

    def get_by_id(self, coop_id: int, user_id: int) -> CoopSpending:
        sql = self.get_sql('get_coop_by_id.sql')
        return self.query_one(CoopSpending, sql, dict(coop_id=coop_id, user_id=user_id))

    def get_by_user_id(self, user_id: int) -> List[CoopSpending]:
        sql = self.get_sql('get_coops_by_user_id.sql')
        return self.query_all(CoopSpending, sql, dict(user_id=user_id))

    def add(self, coop: CoopSpending) -> int:
        sql = self.get_sql('add_coop.sql')
        return self.execute(sql, coop.to_dict())
