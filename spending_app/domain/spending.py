from schematics.models import Model
from schematics.types import IntType, StringType, DateType, DecimalType


class SpendingPage(Model):
    year = IntType()
    month = IntType()
    balance = DecimalType()


class Spending(Model):
    id = IntType()
    user_id = IntType()
    date = DateType()
    sum = DecimalType()
    text = StringType()
    category = IntType()


class SpendingList(Model):
    id = IntType()
    date = DateType()
    sum = DecimalType()
    text = StringType()
    category = IntType()
