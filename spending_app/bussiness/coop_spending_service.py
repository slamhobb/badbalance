from typing import List

import inject

from spending_app.dao.coop_spending.coop_spending_dao import CoopSpendingDao
from spending_app.dao.coop_spending.coop_spending_item_dao import CoopSpendingItemDao
from spending_app.domain.coop_spending import CoopSpending, CoopSpendingItem


class CoopSpendingService:
    coop_spending_dao = inject.attr(CoopSpendingDao)
    coop_spending_item_dao = inject.attr(CoopSpendingItemDao)

    def get_coop_by_id(self, coop_id: int, user_id: int) -> CoopSpending:
        return self.coop_spending_dao.get_by_id(coop_id, user_id)

    def get_coops_by_user_id(self, user_id: int) -> List[CoopSpending]:
        return self.coop_spending_dao.get_by_user_id(user_id)

    def add_coop_spending(self, coop: CoopSpending) -> int:
        return self.coop_spending_dao.add(coop)

    def get_coop_spending_items(self, coop_id: int, user_id: int) -> List[CoopSpendingItem]:
        return self.coop_spending_item_dao.get_items_by_coop_id(coop_id, user_id)

    def add_coop_spending_item(self, item: CoopSpendingItem, user_id: int) -> int:
        coop = self.coop_spending_dao.get_by_id(item.coop_spending_id, user_id)

        # проверям что item добавляется в coop, принадлежащий текущему пользователю
        if coop is None:
            return 0

        # проверить что пользователи в pays и debts существуеют в coops

        return self.coop_spending_item_dao.add_item(item)
