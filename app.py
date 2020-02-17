import csv
import os
from flask import Flask, render_template, request
from flask_pymongo import PyMongo


app = Flask(__name__)
app._static_folder = os.path.abspath("templates/static/")
app.config[
    'MONGO_URI'] = "mongodb+srv://Kumi:Hg1kbxPcCmYtWI6h@cluster0-atswd.azure.mongodb.net/experiment?retryWrites=true&w=majority"

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
@app.route('/upload_resp', methods=["POST"])
def db_test():
    res = request.get_json(silent=True)
    mongo.db.perceptionExperiment.insert(res)
    print('inserted', res)
    return 'inserted!'

def db_get_all():
    all = mongo.db.perceptionExperiment.find({})
    all_arr = [item for item in all]
    real_arr = []
    for i in range(len(all_arr)):
        adict = all_arr[i]
        real_dict = {}
        for key,item in adict['responses'].items():
            trial_dict = {'time': adict['time']}
            if (int(key) in [1, 2, 3]):
                trial_dict['type'] = 'radial'
            elif (int(key) in [4, 5, 6]):
                trial_dict['type'] = 'small-multiple'
            elif (int(key) in [7, 8, 9]):
                trial_dict['type'] = 'bar'
            else:
                trial_dict['type'] = 'pie'

            trial_dict['guess'] = item['guess']
            trial_dict['truth'] = item['truth']

            real_arr.append(trial_dict)


    csv_headers = ['time', 'type', 'truth', 'guess']
    # csv_headers.extend([(str(i)+'_guess', str(i)+'_real') for i in range(1,13)])
    print(csv_headers)

    try:
        with open('results/dict.csv', 'w', newline="") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_headers)
            writer.writeheader()
            for data in real_arr:
                writer.writerow(data)
    except IOError:
        print("I/O error")

if __name__ == '__main__':
    # db_get_all()
    app.run(debug=True)
