from schematics.models import Model
from schematics.types import IntType, StringType


class AuthToken(Model):
    id = IntType()
    token = StringType()
    user_id = IntType()


class UserContext(Model):
    user_id = IntType()
    login = StringType()
