import flask
from flask_cors import CORS

import json
import os

# count the number of news to allow auto indexing
newsCount = 0
while os.path.exists("./data/news/" + str(newsCount+1)):
    newsCount += 1

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/contacts', methods=['GET'])
def get_contacts():
    return open("data/contact.json", "r").read()

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

@app.route('/news', methods=['POST'])
def post_news():
    global newsCount
    path = "./data/news/" + str(newsCount+1)
    os.mkdir(path)
    newsCount += 1

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
    
app.run()