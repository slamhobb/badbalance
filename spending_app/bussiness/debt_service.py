import inject

from spending_app.dao.debt.debt_dao import DebtDao
from spending_app.dao.debt.debt_item_dao import DebtItemDao


class DebtService:
    debt_dao = inject.attr(DebtDao)
    debt_item_dao = inject.attr(DebtItemDao)

    def add_debt(self, user_id, name):
        return self.debt_dao.add(user_id, name)

    def close_debt(self, debt_id, user_id):
        self.debt_dao.close(debt_id, user_id)

    def add_debt_item(self, debt_item, user_id):
        debt = self.debt_dao.get_by_id(debt_item.debt_id, user_id)

        # проверяем что debt_item добавляется в debt, принадлежащий текущему пользователю
        if debt is None:
            return 0

        return self.debt_item_dao.add_item(debt_item)

    def delete_debt(self, debt_id, user_id):
        count = self.debt_item_dao.count_items_by_debt_id(debt_id, user_id)

        if count == 0:
            self.debt_dao.delete(debt_id, user_id)
            return True

        return False

    def delete_debt_item(self, debt_item_id, debt_id, user_id):
        debt = self.debt_dao.get_by_id(debt_id, user_id)

        # проверяем что debt_item удаляется из debt, принадлежащего текущему пользователю
        if debt is not None:
            self.debt_item_dao.delete_item(debt_item_id)

    def get_items_for_not_closed_debts(self, user_id):
        debts = self.debt_dao.get_by_user_id(user_id)
        items = self.debt_item_dao.get_items_by_user_id(user_id)

        result = list(
            map(lambda d: self._map_debt(d, list(filter(lambda i: i.debt_id == d.id, items))),
                debts))

        return result

    # TODO: зачем нужен этот маппер? почему здесь не возвращается объект?
    @staticmethod
    def _map_debt(debt, items):
        return {
            'debt_id': debt.id,
            'name': debt.name,
            'items': [i.to_dict() for i in items]
        }
