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

    def save_coop_spending_item(self, item: CoopSpendingItem, user_id: int) -> int:
        # проверям что item добавляется в coop, принадлежащий текущему пользователю
        coop_spending_id = self._get_coop_spending_id(item)
        coop = self.coop_spending_dao.get_by_id(coop_spending_id, user_id)
        if coop is None:
            return 0

        if not self._validate_item(item):
            return 0

        # TODO: проверить что пользователи в pays и debts существуеют в coops

        if (item.id or 0) > 0:
            return self.coop_spending_item_dao.update(item)
        else:
            return self.coop_spending_item_dao.add(item)

    def _get_coop_spending_id(self, item: CoopSpendingItem) -> int:
        coop_spending_id = item.coop_spending_id

        # для существующих item берём coop_spending_id из базы
        if (item.id or 0) > 0:
            old_item = self.coop_spending_item_dao.get_item_by_id(item.id)
            coop_spending_id = old_item.coop_spending_id

        return coop_spending_id

    def _validate_item(self, item: CoopSpendingItem) -> bool:
        if item.type == 'pay':
            for pay in item.pays:
                debt_sum = sum(debt.sum for debt in pay.debts)
                if debt_sum > pay.sum:
                    return False

        return True