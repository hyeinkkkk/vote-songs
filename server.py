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

@app.route('/add-player/<age>/<gender>')
def add_player(age=0,gender=''):
    print("add player!")
    if age == 0 or gender == '':
        return
    player = models.Player(gender=gender,age=age)
    db.session.add(player)
    db.session.flush()
    db.session.commit()

    return JSONEncoder(ensure_ascii=False).encode({'player_id':player.id})


@app.route('/list')
def get_list():
    song_list = []

    for song in models.Song.query.filter().all():
        s =  common.make_plain_dict(song)
        s['album_photo'] = models.Album.query.filter(song.album_id == models.Album.id).first().photo
        song_list.append(s)

    return JSONEncoder(ensure_ascii=False).encode({'song_list':song_list})


@app.route('/submit/<player_id>',methods=["GET", "POST"])
def submit_voting(player_id):
    if request.method == "POST":
        # print("player id is ",player_id)
        # print("****** data")
        # for song in request.get_json():
        #     print(" song ", song["priority"] , " : ", song["title"], "song's type_id ? " ,song["type_id"])
        #     new_vote = models.Vote(player_id=player_id,song_id=song["id"],priority=song["priority"])
        #     db.session.add(new_vote)
        # db.session.commit()
        #
        # player_type = common.make_plain_dict(models.Type.query.filter(models.Type.id == song["type_id"]).first())

        for song in request.get_json():
            # print(" song ", song["title"], "song's type_id ? " ,song["type_id"])
            new_vote = models.Vote(player_id=player_id,song_id=song["id"],priority=1)
            db.session.add(new_vote)
        db.session.commit()

        player_type = common.make_plain_dict(models.Type.query.filter(models.Type.id == song["type_id"]).first())

        return JSONEncoder(ensure_ascii=False).encode({'player_type':player_type, "song": song})

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
