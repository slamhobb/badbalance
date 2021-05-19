import inject

from spending_app.dao.spending.spending_dao import SpendingDao


class SpendingService:
    spending_dao = inject.attr(SpendingDao)

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
