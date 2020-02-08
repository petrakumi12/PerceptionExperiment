import os
from flask import Flask, render_template, make_response, request, url_for, redirect


app = Flask(__name__)
app._static_folder = os.path.abspath("templates/static/")

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/questions')
def results():
    return render_template('questionPage.html')


if __name__ == '__main__':
    app.run(debug=True)
