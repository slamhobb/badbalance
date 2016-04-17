from schematics.models import Model
from schematics.types import IntType, StringType


class User(Model):
    id = IntType()
    login = StringType()
    password = StringType()
