import inject

from typing import List

from spending_app.dao.spending.category_dao import CategoryDao
from spending_app.domain.category import Category
from spending_app.domain.category import CategoryList


class CategoryService:
    category_dao = inject.attr(CategoryDao)

    def get_category_list(self, user_id: int) -> List[CategoryList]:
        return self.category_dao.get_list_by_user(user_id)

    def save_category(self, category: Category) -> int:
        if (category.id or 0) > 0:
            self.category_dao.update(category)
            return category.id
        else:
            return self.category_dao.add(category)

    def delete_category(self, category_id: int, user_id: int) -> None:
        self.category_dao.delete(category_id, user_id)
