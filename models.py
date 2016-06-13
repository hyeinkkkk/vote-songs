from datetime import datetime
# from app import db
# import db
from server import db,app


class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    issue_id = db.Column(db.Integer)
    generation = db.Column(db.Integer)
    residence = db.Column(db.String)
    city_contentment = db.Column(db.Boolean)
    travel_exp = db.Column(db.Boolean)
    symbol_number = db.Column(db.Integer)
    create_time = db.Column(db.DateTime, default=datetime.now)
    mobile_login_time = db.Column(db.DateTime)
    pad_exit_time = db.Column(db.DateTime)
    mobile_exit_time = db.Column(db.DateTime)
    update_time = db.Column(db.DateTime)

class Keyword(db.Model):
    __tablename__ = 'keywords'
    id = db.Column(db.Integer, primary_key=True)
    place = db.Column(db.String)
    not_trimmed_keyword_en = db.Column(db.String)



class Choice(db.Model):
    __tablename__ = 'choices'
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    category_en = db.Column(db.String)
    category_ko = db.Column(db.String)
    value = db.Column(db.String)
    create_time = db.Column(db.DateTime, default=datetime.now)
    update_time = db.Column(db.DateTime)

    player = db.relationship("Player", backref=db.backref('player_choices', order_by=id))


class Vote(db.Model):
    __tablename__ = 'votes'
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    keyword_id = db.Column(db.Integer, db.ForeignKey('keywords.id'))
    answer_type = db.Column(db.String)
    create_time = db.Column(db.DateTime, default=datetime.now)
    update_time = db.Column(db.DateTime)

    player = db.relationship("Player", backref=db.backref('player_votes', order_by=id))
    keyword = db.relationship("Keyword", backref=db.backref('keyword_votes', order_by=id))

class Typo(db.Model):
    __tablename__ = 'typos'
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    keyword = db.Column(db.String)
    previous_trial = db.Column(db.Boolean)
    true_answer = db.Column(db.Boolean)
    create_time = db.Column(db.DateTime, default=datetime.now)

    player = db.relationship("Player", backref=db.backref('player_typos', order_by=id))
