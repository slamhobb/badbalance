class Category(object):
    def __init__(self, id, user_id, name):
        self.id = id
        self.user_id = user_id
        self.name = name

    @classmethod
    def from_dict(cls, adict):
        category = Category(
            id=adict['id'],
            user_id=adict['user_id'],
            name=adict['name']
        )

        return category

    def to_dict(self):
        adict = {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name
        }

        return adict


class CategoryList(object):
    def __init__(self, id, name):
        self.id = id
        self.name = name

    @classmethod
    def from_dict(cls, adict):
        category_list = CategoryList(
            id=adict['id'],
            name=adict['name']
        )

        return category_list

    def to_dict(self):
        adict = {
            'id': self.id,
            'name': self.name
        }

        return adict
