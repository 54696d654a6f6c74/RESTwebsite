from Binders.BasicBinder import bind

from flask import Flask
from flask_cors import CORS

from Views.NewsView import NewsView
from Views.ContactsView import ContactsView
from Views.AboutView import AboutView


app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

page_size = 1

views = [
    NewsView(
        "./data/news",
        ["header", "content", "md"],
        "header",
        page_size
    ),
    ContactsView(
        "./data/contacts",
        ["details"],
        "details",
        page_size
    ),
    AboutView(
        "./data/entry",
    ),
    AboutView(
        "./data/freepositions",
    ),
    AboutView(
        "./data/projects",
    ),
    AboutView(
        "./data/exams",
    ),
    AboutView(
        "./data/aboutus",
    )
]

names = [
    "news",
    "contacts",
    "entry",
    "freepositions",
    "projects",
    "exams",
    "aboutus"
]

bind(app, names, views)

app.run()
