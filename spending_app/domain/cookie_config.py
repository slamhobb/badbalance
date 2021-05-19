from __future__ import annotations


class CookieConfig:
    def __init__(self, default_page_fast_spending):
        self.default_page_fast_spending = default_page_fast_spending

    @classmethod
    def from_dict(cls, adict: dict) -> CookieConfig:
        config = CookieConfig(
            default_page_fast_spending=adict['default_page_fast_spending'],
        )

        return config

    def to_dict(self) -> dict:
        adict = {
            'default_page_fast_spending': self.default_page_fast_spending
        }

        return adict
