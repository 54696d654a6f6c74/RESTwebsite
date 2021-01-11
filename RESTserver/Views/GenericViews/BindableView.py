from flask.views import MethodView
from flask import Blueprint


class BindableView(MethodView):
    def bind(bp: Blueprint, view_type, **init_args):
        raise NotImplementedError()
