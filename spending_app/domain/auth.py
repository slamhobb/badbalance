from schematics.models import Model
from schematics.types import IntType, StringType


class AuthToken(Model):
    id = IntType()
    token = StringType()
    user_id = IntType()
