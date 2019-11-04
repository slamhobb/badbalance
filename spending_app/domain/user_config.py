class UserConfig:
    def __init__(self, default_page_fast_spending):
        self.default_page_fast_spending = default_page_fast_spending

    @classmethod
    def from_dict(cls, adict):
        user = UserConfig(
            default_page_fast_spending=adict['default_page_fast_spending'],
        )

        return user

    def to_dict(self):
        adict = {
            'default_page_fast_spending': self.default_page_fast_spending
        }

        return adict
