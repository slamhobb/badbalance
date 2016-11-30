from schematics.models import Model
from schematics.types import IntType, StringType


class Category(Model):
    id = IntType()
    user_id = IntType()
    name = StringType()


class CategoryList(Model):
    id = IntType()
    name = StringType()
