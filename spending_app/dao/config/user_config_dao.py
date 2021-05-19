from spending_app.dao.base_dao import BaseDao
from spending_app.domain.user_config import UserConfig


class UserConfigDao(BaseDao):
    def __init__(self):
        super().__init__('/config/sql/')

    def get(self, user_id: int) -> UserConfig:
        sql = self.get_sql('get.sql')
        return self.query_one(UserConfig, sql, dict(user_id=user_id))

    def save(self, user_config: UserConfig) -> None:
        sql = self.get_sql('save.sql')
        return self.execute(sql, user_config.to_dict())
