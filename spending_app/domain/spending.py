from schematics.models import Model
from schematics.types import IntType, StringType, DateType, DecimalType


class SpendingPage(Model):
    year = IntType()
    month = IntType()


class Spending(Model):
    id = IntType()
    user_id = IntType()
    date = DateType(default="2013-04-07")
    sum = DecimalType()
    text = StringType()
    category = StringType()


class SpendingList(Model):
    id = IntType()
    date = DateType(default="2013-04-07")
    sum = DecimalType()
    text = StringType()
    category = StringType()
