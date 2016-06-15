from flask import Flask
from flask import render_template,request
from flask.ext.sqlalchemy import SQLAlchemy
# from models import Song,Album,Type
from datetime import datetime
from common import Common
import json
from json import JSONEncoder
import loads,models


app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
common = Common()

@app.route('/')
def hello_world():
    return render_template('index.html')
    # return 'Hello World!'

@app.route('/list')
def get_list():
    song_list = []

    for song in models.Song.query.filter().all():
        #db.session.query(models.Song).join(models.Album).filter().all():
        s =  common.make_plain_dict(song)
        s['album_photo'] = models.Album.query.filter(song.album_id == models.Album.id).first().photo
        song_list.append(s)

    # print("song_list ??? ",song_list)

    return JSONEncoder(ensure_ascii=False).encode({'song_list':song_list})


@app.route('/submit',methods=["GET", "POST"])
def submit_voting():
    if request.method == "POST":
        print("****** data")
        for song in request.get_json():
            print(" song ", song["priority"] , " : ", song["title"])
        return "OK"

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
