from schematics.models import Model
from schematics.types import IntType, StringType, DateType


class Spending(Model):
    id = IntType()
    user_id = IntType()
    date = DateType()
    sum = IntType()
    text = StringType()
    category_id = IntType()


class SpendingList(Model):
    id = IntType()
    date = DateType()
    sum = IntType()
    text = StringType()
    category_id = IntType()
