import inject

from spending_app.dao.spending.category import CategoryDao


class CategoryService:
    category_dao = inject.attr(CategoryDao)

    def get_category_list(self, user_id):
        return self.category_dao.get_list_by_user(user_id)
