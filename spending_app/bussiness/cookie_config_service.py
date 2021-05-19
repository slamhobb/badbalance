from spending_app.domain.cookie_config import CookieConfig

defaultConfig = CookieConfig(default_page_fast_spending=False)


class CookieConfigService:
    def get(self, config_dict: dict) -> CookieConfig:
        if config_dict is None:
            return defaultConfig

        config = CookieConfig.from_dict(config_dict)

        return config
