import inject

from spending_app.dao.coop_spending.coop_spending_dao import CoopSpendingDao
from spending_app.dao.coop_spending.coop_spending_item_dao import CoopSpendingItemDao


class CoopSpendingService:
    coop_spending_dao = inject.attr(CoopSpendingDao)
    coop_spending_item_dao = inject.attr(CoopSpendingItemDao)

    def get_coop_spending(self, user_id):
        return self.coop_spending_dao.get_by_user_id(user_id)

    def get_coop_spending_items(self, coop_spending_id, user_id):
        return self.coop_spending_item_dao.get_items_by_coop_id(coop_spending_id, user_id)
