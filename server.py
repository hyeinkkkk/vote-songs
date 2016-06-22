from flask import Flask
from app import flask_app

app = flask_app

if __name__ == '__main__':
    flask_app.debug = True
    flask_app.run(host='0.0.0.0')
