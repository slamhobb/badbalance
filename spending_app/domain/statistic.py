from schematics.models import Model
from schematics.types import StringType, DecimalType


class Statistic(Model):
    sum = DecimalType()
    category = StringType()
