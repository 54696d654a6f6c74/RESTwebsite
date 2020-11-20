import flask
from flask_cors import CORS

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/contacts', methods=['GET'])
def get_contacts():
    ret = open('contact.json').read()
    return ret

app.run()