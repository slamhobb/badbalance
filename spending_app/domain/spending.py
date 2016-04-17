from schematics.models import Model
from schematics.types import IntType, StringType, DateType, DecimalType


class Spending(Model):
    id = IntType()
    user_id = IntType()
    date = DateType(default="2013-04-07")
    sum = DecimalType()
    text = StringType()
    category = StringType()
