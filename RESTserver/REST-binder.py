from flask import Blueprint, Flask
from flask_cors import CORS

from Views.NewsView import NewsView


def bind(app: Flask, name, type, prefix, **initArgs):
    bp = Blueprint(name, __name__, url_prefix=prefix)
    type.bind(bp, **initArgs)
    app.register_blueprint(bp)


app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

# TODO: Generically do all of this

bp = Blueprint("news", __name__, url_prefix="/news")

news_view = NewsView.as_view("news_view",
     path = "./data/news",
     files = ["header", "content", "md"],
     header_file_name = "header"
)

bp.add_url_rule("",
     defaults = {'id': None, 'sort': False, 'file_name': None},
     view_func = news_view,
     methods = ['GET']
)

bp.add_url_rule("/sorted",
     defaults = {'id': None, 'sort': True, 'file_name': None},
     view_func = news_view,
     methods = ['GET']
)

bp.add_url_rule("",
     view_func = news_view,
     methods = ['POST']
)

bp.add_url_rule("/<int:id>",
     defaults = {'sort': None, 'file_name': None},
     view_func = news_view,
     methods = ['GET', 'DELETE']
)

bp.add_url_rule("/<int:id>",
     defaults = {'file_name': None},
     view_func = news_view,
     methods = ['PUT']
)

bp.add_url_rule("/<int:id>/<string:file_name>",
     defaults = {'sort': None},
     view_func = news_view,
     methods = ['GET']
)

bp.add_url_rule("/<int:id>/<string:file_name>",
     view_func = news_view,
     methods = ['PUT']
)

app.register_blueprint(bp)

app.run()
