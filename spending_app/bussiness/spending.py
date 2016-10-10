from datetime import datetime

import inject

from spending_app.dao.spending import SpendingDao


class SpendingService:
    spending_dao = inject.attr(SpendingDao)

    def get_index(self):
        return datetime.now().strftime('%B %Y')

    def get_list_by_user(self, user_id):
        spends = self.spending_dao.get_list(user_id)
        return list(map(lambda x: x.to_primitive(), spends))
        #return self.spending_dao.get_list_by_month_and_year(user_id, 5, 2016)

    def save(self, spending):
        if (spending.id or 0) > 0:
            self.spending_dao.update(spending)
        else:
            self.spending_dao.add(spending)
