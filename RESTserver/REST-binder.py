from flask import Blueprint, Flask
from flask_cors import CORS

from Views.NewsBlueprint import NewsView
from Views.ContactsBlueprint import ContactsView


def bind(app: Flask, name, type, prefix, **initArgs):
    bp = Blueprint(name, __name__, url_prefix=prefix)
    type.bind(bp, **initArgs)
    app.register_blueprint(bp)


app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

# TODO: Figure out a way to automatically load
# all of the non Generic types and bind them

bind(app,
     "news",
     NewsView,
     "/news",
     file_path="/{}/header.json",
     path="/news",
     files=["header.json", "content.json", "md.json"])


bind(app,
     "contacts",
     ContactsView,
     "/contacts",
     file_path="/{}/details.json",
     path="/contacts",
     files=["details.json"]
     )

app.run()
