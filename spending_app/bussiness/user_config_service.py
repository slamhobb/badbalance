import inject

from spending_app.dao.config.user_config_dao import UserConfigDao
from spending_app.domain.user_config import UserConfig


class UserConfigService:
    config_dao = inject.attr(UserConfigDao)

    def get(self, user_id: int) -> UserConfig:
        config = self.config_dao.get(user_id)

        if config is None:
            return UserConfig(user_id=user_id, separate_category_ids=[], spending_goal=0)

        return config

    def save(self, user_config: UserConfig) -> None:
        self.config_dao.save(user_config)
