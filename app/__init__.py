from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

flask_app = Flask(__name__)
flask_app.config.from_object('config')
db = SQLAlchemy(flask_app)

from app import models,loads,common,apis
