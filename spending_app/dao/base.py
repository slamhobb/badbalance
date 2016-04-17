import sqlite3

from spending_app.config import settings


class BaseDao:
    @staticmethod
    def __create_connection():
        conn = sqlite3.connect(settings['DATABASE'])
        conn.row_factory = sqlite3.Row
        return conn

    def query_one(self, sql, params):
        conn = self.__create_connection()
        item = conn.execute(sql, params).fetchone()
        conn.close()

        if item is None:
            return None

        return dict(item)

    def query_all(self, sql, params):
        conn = self.__create_connection()
        items = conn.execute(sql, params).fetchall()
        conn.close()

        return [dict(item) for item in items]

    def execute(self, sql, params):
        conn = self.__create_connection()
        conn.execute(sql, params)
        conn.commit()
        conn.close()

    def executescript(self, query):
        conn = self.__create_connection()
        conn.executescript(query)
        conn.commit()
        conn.close()
