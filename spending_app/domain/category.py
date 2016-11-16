from schematics.models import Model
from schematics.types import IntType, StringType


class CategoryList(Model):
    id = IntType()
    name = StringType()
