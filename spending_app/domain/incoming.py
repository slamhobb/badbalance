from schematics.models import Model
from schematics.types import IntType, StringType, DateType


class Incoming(Model):
    id = IntType()
    user_id = IntType()
    date = DateType()
    sum = IntType()
    text = StringType()


class IncomingList(Model):
    id = IntType()
    date = DateType()
    sum = IntType()
    text = StringType()
