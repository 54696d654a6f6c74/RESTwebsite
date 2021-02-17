from Binders.BasicBinder import bind

from flask import Flask
from flask_cors import CORS

from Views.NewsView import NewsView


app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

views = [
    NewsView(
        "./data/news",
        ["header", "content", "md"],
        "header"
    )
]

names = [
    "news"
]

bind(app, names, views)

app.run()
