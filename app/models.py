from datetime import datetime
from app import db


class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String)
    age = db.Column(db.Integer)
    type_id = db.Column(db.Integer, db.ForeignKey('types.id'), default=None)
    create_time = db.Column(db.DateTime, default=datetime.now)
    update_time = db.Column(db.DateTime)


class Song(db.Model):
    __tablename__ = 'songs'
    id = db.Column(db.Integer, primary_key=True)
    title_ko = db.Column(db.String)
    title_en = db.Column(db.String)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))
    lyric = db.Column(db.String)
    type_id = db.Column(db.Integer, db.ForeignKey('types.id'))

    # album = db.relationship("Album", backref=db.backref("songs", order_by=id))


class Album(db.Model):
    __tablename__ = 'albums'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    photo = db.Column(db.String)
    description = db.Column(db.String)



class Vote(db.Model):
    __tablename__ = 'votes'
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    priority = db.Column(db.Integer)
    create_time = db.Column(db.DateTime, default=datetime.now)

    # player = db.relationship("Player", backref=db.backref('player_votes', order_by=id))
    # keyword = db.relationship("Keyword", backref=db.backref('keyword_votes', order_by=id))

class Type(db.Model):
    __tablename__ = 'types'
    id = db.Column(db.Integer, primary_key=True)
    name_ko = db.Column(db.String)
    name_en = db.Column(db.String)
    description_ko = db.Column(db.String)
    description_en = db.Column(db.String)
