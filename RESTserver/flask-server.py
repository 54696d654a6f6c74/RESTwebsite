import flask
from flask_cors import CORS

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/contacts', methods=['GET'])
def get_contacts():
    return open("data/contact.json", "r").read()

@app.route('/news/<id>', methods=['GET'])
def get_news_article(id):
    return open("data/news/{}.json".format(id), "r").read()    

app.run()