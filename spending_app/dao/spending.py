from spending_app.dao.base import BaseDao
from spending_app.domain.spending import Spending


class SpendingDao(BaseDao):
    def get_list(self, user_id):
        result = self.query_all("""
            select
                id,
                user_id,
                date,
                sum,
                text,
                category
                from spending
                where user_id = :user_id
                order by id""",
                                dict(user_id=user_id))

        return [Spending(r) for r in result]

    def add(self, spending):
        self.execute("""
            insert into spending (user_id, date, sum, text, category)
                values (:user_id, :date, :sum, :text, :category)""",
                     spending.to_primitive())
