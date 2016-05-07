from spending_app.dao.base import BaseDao
from spending_app.domain.spending import Spending


class SpendingDao(BaseDao):
    def get_list_by_month_and_year(self, user_id, month, year):
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
                    and abs(strftime('%Y', date)) = :year
                    and abs(strftime('%m', date)) = :month
                order by strftime('%d', date), id""",
                                dict(user_id=user_id, month=month, year=year))

        return [Spending(r) for r in result]

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
