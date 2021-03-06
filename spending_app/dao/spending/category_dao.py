from spending_app.dao.base_dao import BaseDao
from spending_app.domain.category import CategoryList


class CategoryDao(BaseDao):
    def __init__(self):
        super().__init__('/spending/sql/')

    def get_list_by_user(self, user_id):
        sql = self.get_sql('get_category_list_by_user.sql')
        return self.query_all(CategoryList, sql, dict(user_id=user_id))

    def add(self, category):
        sql = self.get_sql('add_category.sql')
        return self.execute(sql, category.to_dict())

    def update(self, category):
        sql = self.get_sql('update_category.sql')
        self.execute(sql, category.to_dict())

    def delete(self, category_id, user_id):
        sql = self.get_sql('delete_category.sql')
        self.execute(sql, dict(id=category_id, user_id=user_id))
