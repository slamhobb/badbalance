import inject

from spending_app.dao.config.user_config_dao import UserConfigDao
from spending_app.domain.user_config import UserConfig


class UserConfigService:
    config_dao = inject.attr(UserConfigDao)

    def get(self, user_id: int) -> UserConfig:
        return self.config_dao.get(user_id)

    def save(self, user_config: UserConfig) -> None:
        self.config_dao.save(user_config)
