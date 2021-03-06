from flask import Flask
from flask import render_template,request
from flask.ext.sqlalchemy import SQLAlchemy
# from models import Song,Album,Type
from datetime import datetime
from app import flask_app
from .common import make_plain_dict
import json
from collections import OrderedDict
from json import JSONEncoder
from .loads import *
from .models import Song, Player, Vote, Album, Type




@flask_app.route('/')
def hello_world():
    return render_template('index.html')
    # return 'Hello World!'

@flask_app.route('/add-player/<age>/<gender>/<language>')
def add_player(age=0, gender='', language=''):
    print("add player!", language)
    if age == 0 or gender == '':
        return
    player = Player(gender=gender,age=age)
    db.session.add(player)
    db.session.flush()
    db.session.commit()

    return JSONEncoder(ensure_ascii=False).encode({'player_id':player.id})


@flask_app.route('/list')
def get_list():
    song_list = []

    for song in Song.query.filter().all():
        s =  make_plain_dict(song)
        s['album_photo'] = Album.query.filter(song.album_id == Album.id).first().photo
        song_list.append(s)

    return JSONEncoder(ensure_ascii=False).encode({'song_list':song_list})


@flask_app.route('/submit/<player_id>',methods=["GET", "POST"])
def submit_voting(player_id):
    player = Player.query.filter(Player.id == int(player_id)).first()

    if request.method == "GET":
        if player.type_id is not None:
            player_type = make_plain_dict(Type.query.filter(Type.id == player.type_id).first())
            return JSONEncoder(ensure_ascii=False).encode({'player_type': player_type})

    elif request.method == "POST":

        types = {}
        for type_row in Type.query.filter().all():
            t = make_plain_dict(type_row)
            t['count'] = 0
            types[t['id']] = t


        for song in request.get_json():
            # print(" song ", song["title"], "song's type_id ? " ,song["type_id"])
            types[song["type_id"]]['count'] = types[song["type_id"]]['count'] + 1
            types[song["type_id"]]['priority'] = song["priority"]
            new_vote = Vote(player_id=player_id,song_id=song["id"],priority=song["priority"])
            db.session.add(new_vote)
        db.session.commit()


        sorted_types = OrderedDict(sorted(types.items(), key=lambda x: x[1]['count'],reverse=True))

        keys = []
        for key in sorted_types:
            keys.append(key)

        first_key = keys[0]
        second_key = keys[1]


        player_type = {}

        if types[first_key]['count'] != types[second_key]['count']:
            player_type = make_plain_dict(Type.query.filter(Type.id == types[first_key]['id']).first())
        else:
            if types[first_key]['priority'] < types[second_key]['priority']:
                player_type = make_plain_dict(Type.query.filter(Type.id == types[first_key]['id']).first())
            else:
                player_type = make_plain_dict(Type.query.filter(Type.id == types[second_key]['id']).first())

        print("player_type",player_type['id'])

        player.type_id = player_type['id']
        player.update_time = datetime.now()
        db.session.commit()

        return JSONEncoder(ensure_ascii=False).encode({'player_type':player_type, "song": song})
