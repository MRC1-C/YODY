from flask import Flask
from pymongo import MongoClient
from flask import request
from flask import jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import pandas as pd
import numpy as np
from ar_mining import suggest_rule

app = Flask(__name__)
JWTManager(app)
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
client = MongoClient('mongodb+srv://CJ:1234@cluster0.uuqiy.mongodb.net/?retryWrites=true&w=majority')
db = client.get_database('yody')
users = db.users
items = db.items

def item(f):
    return {
        "id": f[0],
        "name": f[2],
        "price": f[5],
        "mota": f[8],
        "image_url": f[9]
    }
    
def itemall(f):
    return {
        "id": f[-1],
        "name": f[1],
        "price": f[4],
        "mota": f[7],
        "image_url": f[8]
    }

def itemhome(f):
    return {
        "id": f[-1],
        "name": f[1],
        "price": f[4],
        "mota": f[7],
        "image_url": f[8]
    }

@app.route("/")
def hello_world():
    print(list(users.find()))
    return "<p>Hello, World!</p>"


@app.route("/login",methods=["POST"])
def login():
    username = request.json.get("username", None)
    try:
        user = pd.read_csv('./mockData/suggest_{}.csv'.format(username))
        access_token = create_access_token(identity=username)
        return jsonify({"access_token":access_token})
    except:
        return jsonify({"msg": "Bad username or password"}), 401

@app.route("/getuser", methods=["GET"])
@jwt_required()
def getuser():
    current_user = get_jwt_identity()
    print(current_user)
    return 'hi'

@app.route("/signup",methods=["POST"])
def signup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    new_user = {
        "username": username,
        "password": password,
        "itemId": []
    }
    users.insert_one(new_user)
    access_token = create_access_token(identity=username)
    return jsonify({"access_token":access_token})

@app.route("/getData",methods=["GET"])
def getData():
    its = pd.read_csv('./mockData/data.csv')
    a = np.asarray(its)[:50]
    return jsonify([*map(itemall,a)])

@app.route("/getDataSuggest",methods=["GET"])
@jwt_required()
def getDataSuggest():
    current_user = get_jwt_identity()
    its = pd.read_csv('./mockData/suggest_{}.csv'.format(current_user))
    a = np.asarray(its)
    return jsonify([*map(item,a)])

@app.route("/getHistory",methods=["GET"])
@jwt_required()
def getHistory():
    current_user = get_jwt_identity()
    its = pd.read_csv('./mockData/history_{}.csv'.format(current_user))
    a = np.asarray(its)
    return jsonify([*map(itemall,a)])
    # return 'hi'
@app.route("/getItemHome",methods=["GET"])
def getItemHome():
    its = pd.read_csv('./mockData/suggest_list_home.csv')
    a = np.asarray(its)
    return jsonify([*map(itemhome,a)])
@app.route("/suggest",methods=["POST"])
def suggest():
    res = []
    items = request.json.get("items", None)
    data = suggest_rule(items)
    
    for rule in data:
        ok = True
                  
        if_cond = list(rule[0])

        for if_cond_item in if_cond:
            if if_cond_item not in items:
                ok = False
                break
        if ok == True:
            res.append(rule)
    r = []
    for i in res:
        t1 = ','.join(list(i[0]))
        t2 = ','.join(list(i[1]))
        txt = 'Nếu mua {} thì nên mua {}'.format(t1, t2)
        r.append(txt)
    return jsonify({"text": r})

@app.route("/getDataItem",methods=["POST"])
def getDataItem():
    current_id  = request.json.get("id", None)
    its = pd.read_csv('./mockData/item/suggest_list_{}.csv'.format(current_id))
    a = np.asarray(its)
    return jsonify([*map(itemall,a)])

@app.route("/getItem",methods=["POST"])
def getItem():
    current_id  = request.json.get("id", None)
    its = pd.read_csv('./mockData/data.csv')
    item = its[its["item index"]==int(current_id)]
    return jsonify([*map(itemall,np.asarray(item))])