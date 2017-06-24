from datetime import datetime
import calendar

import inject

from spending_app.dao.spending.spending import SpendingDao
from spending_app.dao.spending.category import CategoryDao
from spending_app.domain.spending import SpendingPage


class SpendingService:
    spending_dao = inject.attr(SpendingDao)
    category_dao = inject.attr(CategoryDao)

    def get_index(self):
        now = datetime.now()
        year = now.year
        month = now.month

        page = SpendingPage()
        page.year = year
        page.month = month
        page.mlist = enumerate([calendar.month_abbr[i] for i in range(1, 13)], 1)
        page.ylist = [2016, 2017, 2018]
        return page

    def get_by_month(self, user_id, year, month):
        return self.spending_dao.get_list_by_month(user_id, year, month)

    def save(self, spending):
        if (spending.id or 0) > 0:
            self.spending_dao.update(spending)
            return spending.id
        else:
            return self.spending_dao.add(spending)

    def delete(self, spend_id, user_id):
        self.spending_dao.delete(spend_id, user_id)

    def get_statistic(self, user_id, year, month):
        return self.spending_dao.get_statistic(user_id, year, month)

    def get_category_list(self, user_id):
        return self.category_dao.get_list_by_user(user_id)

    def save_category(self, category):
        if (category.id or 0) > 0:
            self.category_dao.update(category)
        else:
            self.category_dao.add(category)

    def delete_category(self, category_id, user_id):
        self.category_dao.delete(category_id, user_id)

    def get_balance_by_month(self, user_id, year, month):
        return self.spending_dao.get_balance_by_month(user_id, year, month)
