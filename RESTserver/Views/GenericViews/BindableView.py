from flask.views import View
from flask import Blueprint, make_response, jsonify


class BindableView(View):
    data_root = "./data"

    def return_response(self, message, code):
        return make_response(jsonify(message=message), code)

    def bind(bp: Blueprint, view_type, **init_args):
        raise NotImplementedError()
