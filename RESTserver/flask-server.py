import flask
from flask_cors import CORS

import json
import os
import shutil

# count the number of news to allow auto indexing
def indexNews():
    return os.listdir("./data/news/")

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/contacts', methods=['GET'])
def get_contacts():
    return open("data/contact.json", "r").read()

def get_news_headers(sort_news):
    headers = []
    allNews = sorted(indexNews()) if sort_news else indexNews()
    for i in range(len(allNews)):
        header = open("data/news/{}/header.json".format(allNews[i]), "r")
        headers.append(header.read())
        header.close()
    return json.dumps(headers)

@app.route('/news/headers', methods=['GET'])
def get_all_news_headers():
    return get_news_headers(False)

@app.route('/news/headers/sorted', methods=['GET'])
def get_all_news_headers_sorted():
    return get_news_headers(True)

@app.route('/news/indecies', methods=['GET'])
def get_indecies():
    return json.dumps(indexNews())

@app.route('/news/indecies/sorted', methods=['GET'])
def get_indecies_sorted():
    return json.dumps(sorted(indexNews()))

def get_news_content_by_id(id):
    return open("data/news/{}/content.json".format(id), "r+")

def update_news_content(id, data):
    file = get_news_content_by_id(id)
    file.writelines(json.dumps(data))
    file.truncate()

@app.route('/news/<id>/content', methods=['GET', 'PUT'])
def get_news_article(id):
    if flask.request.method == 'GET':
        return get_news_content_by_id(id).read()
    else:
        update_news_content(id, flask.request.get_json())
        return flask.Response(200)

def get_news_header_by_id(id):
    file = None
    try:
        file = open('data/news/{}/header.json'.format(id), "r+")
    except(FileNotFoundError):
        return flask.abort(flask.Response(None))
    
    return file

def update_news_header(id, data):
    file = get_news_header_by_id(id)
    file.writelines(json.dumps(data))
    file.truncate()

@app.route('/news/<id>/header', methods=['GET', 'PUT'])
def get_news_header(id):
    if flask.request.method == 'GET':
        return get_news_header_by_id(id).read()
    else:
        update_news_header(id, flask.request.get_json())
        return flask.Response(200)

# os.listdir() does not return folders in a
# sequential order so a sort() is necessary
# which will cause problems for big sets of data
@app.route('/news', methods=['POST'])
def post_news():
    allNews = sorted(indexNews())

    path = None
    if len(allNews) != 0:
        path = "./data/news/" + str(int(allNews[len(allNews)-1])+1)
    else: path = "./data/news/1"

    os.mkdir(path)

    data = flask.request.get_json()

    header = data['header']
    content = data['content']    

    # abstract this functionality away
    file = open(path + "/header.json", "w")
    file.write(json.dumps(header))
    file.close()

    file = open(path + "/content.json", "w")
    file.write(json.dumps(content))
    file.close()
    
    return flask.Response(None)

@app.route("/news/<id>", methods=['DELETE'])
def delete_news(id):
    try:
        shutil.rmtree("data/news/" + str(id))
    except FileNotFoundError:
        return flask.abort(404)
    return flask.Response(200)

app.run()