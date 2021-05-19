from __future__ import annotations

from dataclasses import dataclass
from typing import List
import json


@dataclass
class UserConfig:
    user_id: int
    separate_category_ids: List[int]

    @classmethod
    def from_dict(cls, adict: dict) -> UserConfig:
        json_data = adict['data']
        data = json.loads(json_data)

        config = UserConfig(
            user_id=adict['user_id'],
            separate_category_ids=data['separate_category_ids']
        )

        return config

    def to_dict(self) -> dict:
        data = dict(
            separate_category_ids=self.separate_category_ids
        )
        json_data = json.dumps(data)

        adict = {
            'user_id': self.user_id,
            'data': json_data
        }

        return adict

    def to_web_dict(self) -> dict:
        adict = {
            'separate_category_ids': self.separate_category_ids
        }

        return adict
