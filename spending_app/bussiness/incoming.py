import inject

from spending_app.dao.incoming.incoming import IncomingDao


class IncomingService:
    incoming_dao = inject.attr(IncomingDao)

    def save(self, incoming):
        if (incoming.id or 0) > 0:
            self.incoming_dao.update(incoming)
            return incoming.id
        else:
            return self.incoming_dao.add(incoming)

    def delete(self, incoming_id, user_id):
        self.incoming_dao.delete(incoming_id, user_id)

    def get_list(self, user_id, year, month):
        return self.incoming_dao.get_list(user_id, year, month)
