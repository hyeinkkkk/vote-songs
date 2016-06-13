import os

basedir = os.path.abspath(os.path.dirname(__file__))

DATABASE_NAME = "song-voting"
SQLALCHEMY_DATABASE_URI = 'sqlite:///{0}/{1}.sqlite'.format(os.getcwd(),DATABASE_NAME)
# SQLALCHEMY_DATABASE_URI = 'postgresql://{0}:{1}@localhost:5432/{2}'.format(USERNAME, PASSWORD, DATABASE_NAME)
SQLALCHEMY_TRACK_MODIFICATIONS = True
DEBUG = True
# SQLALCHEMY_ECHO = True
SECRET_KEY = "d3*/wi32^sdxs0^$"

HOST = '0.0.0.0'
PORT = 5000

# from sqlalchemy import create_engine
# from sqlalchemy.orm import scoped_session, sessionmaker
# from sqlalchemy.ext.declarative import declarative_base
#
# basedir = os.path.abspath(os.path.dirname(__file__))
#
# DATABASE_NAME = "song-voting"
# SQLALCHEMY_DATABASE_URI = 'sqlite:///{0}/{1}.sqlite'.format(os.getcwd(),DATABASE_NAME)
#
# engine = create_engine(SQLALCHEMY_DATABASE_URI, convert_unicode=True)
# db_session = scoped_session(sessionmaker(autocommit=False,
#                                          autoflush=False,
#                                          bind=engine))
# Base = declarative_base()
# Base.query = db_session.query_property()
#
# def init_db():
#     # import all modules here that might define models so that
#     # they will be registered properly on the metadata.  Otherwise
#     # you will have to import them first before calling init_db()
#     import yourapplication.models
#     Base.metadata.create_all(bind=engine)
