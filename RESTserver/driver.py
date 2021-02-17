from Binders.BasicBinder import bind

from flask import Flask
from flask_cors import CORS

from Views.NewsView import NewsView
from Views.ContactsView import ContactsView


app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

views = [
    NewsView(
        "./data/news",
        ["header", "content", "md"],
        "header"
    ),
    ContactsView(
        "./data/contacts",
        ["details"],
        "details"
    )
]

names = [
    "news",
    "contacts"
]

bind(app, names, views)

app.run()
