from flask import Blueprint, abort

from Views.GenericViews.BindableView import BindableView

from json import dumps


class IndexableView(BindableView):
    methods = ['GET']

    def __init__(self, path, file):
        self.path = path
        self.file = file

    # Sanitization can be added here

    def dispatch_request(self, id):
        try:
            return dumps(open(f"{IndexableView.data_root}{self.path}/{id}/{self.file}", "r").read())
        except FileNotFoundError:
            return abort(404)

    def bind(bp: Blueprint, path, files):
        for file in files:
            filename = file[:-5]

            bp.add_url_rule("/<id>/" + filename,
                view_func=IndexableView.as_view("/" + filename,
                    path=path,
                    file=file)
            )
