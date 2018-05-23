
class Cache(object):
    dict = {}

    def set_value(self, key, value):
        self.dict[key] = value

    def get_value(self, key):
        return self.dict[key] if key in self.dict else None
