from flask import Flask
from flask import render_template,request
from flask.ext.sqlalchemy import SQLAlchemy

import loads

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

@app.route('/')
def hello_world():
    return render_template('index.html')
    # return 'Hello World!'

@app.route('/list')
def get_list():
    return render_template('list.html')

@app.route('/submit',methods=["GET", "POST"])
def submit_voting():
    if request.method == "POST":
        print("****** data")
        print(request.get_json())
        return "OK"

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
