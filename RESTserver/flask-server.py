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

@app.route('/news/headers', methods=['GET'])
def get_all_news_headers():
    headers = []
    allNews = indexNews()
    print(allNews)
    for i in range(len(allNews)):
        header = open("data/news/{}/header.json".format(allNews[i]), "r")
        headers.append(header.read())
        header.close()
    return json.dumps(headers)

@app.route('/news/<id>/content', methods=['GET'])
def get_news_article(id):
    return open("data/news/{}/content.json".format(id), "r").read()

@app.route('/news/<id>/header', methods=['GET'])
def get_news_header(id):
    file = None
    try:
        file = open('data/news/{}/header.json'.format(id), "r").read()
    except(FileNotFoundError):
        return flask.abort(flask.Response(None))
    
    return file

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
    allNews = indexNews()
    try:
        shutil.rmtree("data/news/" + allNews[int(id)])
    except FileNotFoundError:
        return flask.abort(404)
    return flask.Response(200)

app.run()