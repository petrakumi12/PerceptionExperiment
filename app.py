import os
import info
from flask import Flask, render_template, make_response, request, url_for, redirect
from flask_pymongo import PyMongo

app = Flask(__name__)
app._static_folder = os.path.abspath("templates/static/")
app.config[
    'MONGO_URI'] = info.get_pass()
app.config['MONGO_DBNAME'] = 'experiment'
mongo = PyMongo(app)
db_collection = mongo.db.perceptionExperiment

## routing endpoints
@app.route('/')
def home():
    return render_template("index.html")


@app.route('/questionPage')
def questions():
    return render_template('questionPage.html')

## db interactions
@app.route('/db_test')
def db_test():
    text = mongo.db.perceptionExperiment.find()[0]['text']
    return make_response({'text':text},'OK')


if __name__ == '__main__':
    app.run(debug=True)
