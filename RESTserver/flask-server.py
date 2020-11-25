import flask
from flask_cors import CORS

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
        return flask.abort(404, description="Resource not found")
    
    return file

app.run()