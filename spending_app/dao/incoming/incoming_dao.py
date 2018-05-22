from spending_app.dao.base_dao import BaseDao
from spending_app.domain.incoming import IncomingList


class IncomingDao(BaseDao):
    def __init__(self):
        super().__init__('/incoming/sql/')

    def add(self, incoming):
        sql = self.get_sql('add_incoming.sql')
        return self.execute(sql, incoming.to_dict())

    def update(self, incoming):
        sql = self.get_sql('update_incoming.sql')
        self.execute(sql, incoming.to_dict())

    def delete(self, id, user_id):
        sql = self.get_sql('delete_incoming.sql')
        self.execute(sql, dict(id=id, user_id=user_id))

    def get_list(self, user_id, year, month):
        sql = self.get_sql('get_list_incoming.sql')
        return self.query_all(IncomingList, sql, dict(user_id=user_id, year=year, month=month))
