# coding:UTF-8
from os import path
from xlrd import open_workbook
from .models import Song,Album,Type
from app import db


xl_path = '/import/song_data.xlsx'
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
        self.wb = open_workbook(path)
        return self.wb

    def create_all_data(self):
        self.create_song_data(excel_session.load_wb(import_xl_path))
        self.create_album_data(excel_session.load_wb(import_xl_path))
        self.create_type_data(excel_session.load_wb(import_xl_path))


    def create_song_data(self,wb):
        if Song.query.count():
            return
        target_sheet = wb.sheet_by_name("Songs")
        keys = [ target_sheet.cell_value(0,i) for i in range(target_sheet.ncols)]

        for row in range(target_sheet.nrows-1):
            song_row = {}
            for col, key in enumerate(keys):
                song_row[key] = target_sheet.cell_value(row+1, col)

            s = Song(title_ko=str(song_row["title_ko"]),
                     title_en=str(song_row["title_en"]),
                    album_id= song_row["album_id"], #int(song_row["album_id"]),
                    lyric = str(song_row["lyric"]),
                    type_id = song_row["type_id"]) #int(song_row["type_id"]))
            db.session.add(s)
        db.session.commit()

    def create_album_data(self,wb):
        if Album.query.count():
            return
        target_sheet = wb.sheet_by_name("Albums")
        keys = [ target_sheet.cell_value(0,i) for i in range(target_sheet.ncols)]

        for row in range(target_sheet.nrows-1):
            album_row = {}
            for col, key in enumerate(keys):
                album_row[key] = target_sheet.cell_value(row+1, col)

            s = Album(title=str(album_row["title"]),
                    photo= str(album_row["photo"]),
                    description = str(album_row["description"]))
            db.session.add(s)
        db.session.commit()

    def create_type_data(self,wb):
        if Type.query.count():
            return
        target_sheet = wb.sheet_by_name("Types")
        keys = [ target_sheet.cell_value(0,i) for i in range(target_sheet.ncols)]

        for row in range(target_sheet.nrows-1):
            type_row = {}
            for col, key in enumerate(keys):
                type_row[key] = target_sheet.cell_value(row+1, col)

            s = Type(name_ko=str(type_row["name_ko"]),
                     name_en=str(type_row["name_en"]),
                     description_ko=str(type_row["description_ko"]),
                     description_en=str(type_row["description_en"]))
            db.session.add(s)
        db.session.commit()

db.create_all()
excel_session = Excel()
excel_session.create_all_data()
# excel_session.create_keyword_table()
