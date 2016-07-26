import os
import sqlite3
from spending_app import config


class BaseDao:
    def __init__(self, base_path=''):
        self.base_dir = os.path.dirname(os.path.realpath(__file__)) + base_path

    @staticmethod
    def __create_connection():
        conn = sqlite3.connect(config.DATA_BASE_CONNECTION_STRING)
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
        cur = conn.execute(sql, params)
        inserted_id = cur.lastrowid
        conn.commit()
        conn.close()
        return inserted_id

    def executescript(self, query):
        conn = self.__create_connection()
        conn.executescript(query)
        conn.commit()
        conn.close()

    def get_sql(self, path):
        with open(self.base_dir + path, 'r') as f:
            query = f.read()
        return query
