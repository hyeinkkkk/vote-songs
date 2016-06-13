# coding:UTF-8
from os import path
from xlrd import open_workbook
from models import Keyword
from server import db,app


xl_path = '/import/typo_config.xlsx'
cwd_xl = path.dirname(path.abspath(__file__)) + xl_path
dir_strings = cwd_xl.split("/")
# dir_strings = [i for i in dir_strings if i!="db"]
dir_strings = [i for i in dir_strings]
import_xl_path = "/".join(dir_strings)


class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class Excel(metaclass=Singleton):
    def load_wb(self, path):
        print("path ? ",path)
        self.wb = open_workbook(path)
        return self.wb

    def load_keyword(self, wb):
        print("keyword ?? ", wb)
        self.ws = wb.sheet_by_name("Keywords")
        return self.ws

    def load_keys(self, sheet):
        print("n rows??? ",sheet.nrows)
        self.keys = [ self.ws.cell_value(0,i) for i in range(sheet.ncols)]

    def create_keyword_table(self):
        print("@@@@@@@ ",excel_session.keys)
        for row in range(excel_session.ws.nrows-2):
            keyword_row = {}
            for col, key in enumerate(excel_session.keys):
                keyword_row[key] = excel_session.ws.cell_value(row+1, col)

            print('keyword_row["place"] ',keyword_row["place"], 'keyword_row["keyword_en"] ',keyword_row["keyword_en"])
            k = Keyword(place=str(keyword_row["place"]),
                        not_trimmed_keyword_en=str(keyword_row["keyword_en"]))
            db.session.add(k)
        db.session.commit()

db.create_all()
excel_session = Excel()
excel_session.load_keys(excel_session.load_keyword(excel_session.load_wb(import_xl_path)))
excel_session.create_keyword_table()

print("excel?")
