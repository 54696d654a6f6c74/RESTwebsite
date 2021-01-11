import flask
from flask_cors import CORS

import json
import os
import shutil

def indexData(type):
    return os.listdir("./data/{}".format(type))

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

# Abstract the POST side into a helper
# since it's very similar to 'news' POST
@app.route('/contacts', methods=['GET', 'POST', 'DELETE'])
def get_contacts():
    indecies = sorted(map(int, indexData("contacts")))

    if flask.request.method == 'GET':
        arr = []
        for i in indecies:
            arr.append(json.load(open("./data/contacts/{}/details.json".format(i), "r")))
        return json.dumps(arr)

    if flask.request.method == 'DELETE':
        index = flask.request.get_json()
        try:
            shutil.rmtree("./data/contacts/" + str(indecies[index['index']]))
            return flask.Response(200)
        except FileNotFoundError:
            return flask.abort(404)

    path = None

    if len(indecies) != 0:
        path = "./data/contacts/" + str(int(indecies[len(indecies)-1])+1)
    else: path = "./data/contacts/1"

    os.mkdir(path)
    data = flask.request.get_json()

    file = open(path + "/details.json", "w")
    file.write(json.dumps(data))
    file.close

    return flask.Response(200)

@app.route('/contacts/<id>', methods=['GET', 'PUT', 'DELETE'])
def interact_contact_by_id(id):
    if flask.request.method == 'GET':
        return open("./data/contacts/{}/details.json".format(id), "r").read()
    
    elif flask.request.method == 'PUT':
        target = open("./data/contacts/{}/details.json".format(id), "w")
        target.writelines(json.dumps(flask.request.get_json()))
        target.truncate()
        target.close()
        return
    try:
        shutil.rmtree("data/contacts/" + str(id))
    except FileNotFoundError:
        return flask.abort(404)
    return flask.Response(200)

def get_data_headers(headerType, headerFileName, sortHeaders):
    headers = []
    allHeaders = sorted(map(int, indexData(headerType))) if sortHeaders else indexData(headerType)
    for i in range(len(allHeaders)):
        header = open("data/{}/{}/{}.json".format(headerType, allHeaders[i], headerFileName), "r")
        headers.append(header.read())
        header.close()
    return headers

@app.route('/contacts/headers', methods=['GET'])
def get_contact_headers():
    return json.dumps(get_data_headers("contacts", "details", False))

@app.route('/contacts/headers/sorted', methods=['GET'])
def get_contact_headers_sorted():
    return json.dumps(get_data_headers("contacts", "details", True))

# This This one is faster but only by around 5ms
# use only if performace is VERY necessary
@app.route('/news/headers', methods=['GET'])
def get_all_news_headers():
    return json.dumps(get_data_headers("news", "header", False))

@app.route('/news/headers/sorted', methods=['GET'])
def get_all_news_headers_sorted():
    return json.dumps(get_data_headers("news", "header", True))

@app.route('/news/indecies', methods=['GET'])
def get_indecies():
    return json.dumps(indexData("news"))

@app.route('/news/indecies/sorted', methods=['GET'])
def get_indecies_sorted():
    return json.dumps(sorted(indexData("news")))

def get_news_content_by_id(id):
    return open("data/news/{}/content.json".format(id), "r+")

def update_news_content(id, data):
    file = get_news_content_by_id(id)
    file.writelines(json.dumps(data))
    file.truncate()

@app.route('/news/<id>/content', methods=['GET', 'PUT'])
def get_news_article(id):
    if flask.request.method == 'GET':
        obj = json.load(get_news_content_by_id(id))
        del obj['md']
        return json.dumps(obj)
    else:
        update_news_content(id, flask.request.get_json())
        return flask.Response(200)

@app.route('/news/<id>/content/md', methods=['GET'])
def get_news_article_md(id):
    obj = json.load(get_news_content_by_id(id))
    del obj['fill']
    return json.dumps(obj)

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
@app.route('/news', methods=['POST', 'DELETE'])
def update_news():
    if flask.request.method == 'DELETE':
        indecies = sorted(map(int, indexData("news")))
        index = flask.request.get_json()
        try:
            shutil.rmtree("./data/news/" + str(indecies[index['index']]))
            return flask.Response(200)
        except FileNotFoundError:
            return flask.abort(404)

    allNews = sorted(map(int, indexData("news"))) # have to convert to int for the sort to work properly

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