from flask import Blueprint, Flask


def bind(app: Flask, names: [], bindees: []):
    if len(names) != len(bindees):
        return Exception("The number of names must match the number of views")

    for bindee, name in zip(bindees, names):
        bp = Blueprint(name, __name__, url_prefix="/" + name)
        bindee.bind(bp)
        app.register_blueprint(bp)
