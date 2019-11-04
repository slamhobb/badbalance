from spending_app.domain.user_config import UserConfig

defaultConfig = UserConfig(default_page_fast_spending=False)


class UserConfigService:
    def get(self, config_dict):
        if config_dict is None:
            return defaultConfig

        config = UserConfig.from_dict(config_dict)

        return config
