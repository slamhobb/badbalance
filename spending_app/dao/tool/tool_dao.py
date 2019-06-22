from spending_app.dao.base_dao import BaseDao


class ToolDao(BaseDao):
    def __init__(self):
        super().__init__('/tool/sql/')

    def vacuum(self):
        sql = self.get_sql('vacuum.sql')
        self.execute(sql, {})

    def analyze(self):
        sql = self.get_sql('analyze.sql')
        self.execute(sql, {})

    def reindex(self):
        sql = self.get_sql('reindex.sql')
        self.execute(sql, {})
