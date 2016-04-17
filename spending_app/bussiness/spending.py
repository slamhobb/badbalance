from spending_app.dao.spending import SpendingDao


class SpendingService:
    def __init__(self):
        self.spending_dao = SpendingDao()

    def get_list_by_user(self, user_id):
        return self.spending_dao.get_list(user_id)

    def save(self, spending):
        self.spending_dao.add(spending)
