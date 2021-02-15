from Views.GenericViews.IndexableView import IndexableView
from Views.GenericViews.BindableView import BindableView

from flask import Blueprint, request
from json import dumps


class UpdateableView(IndexableView):
    methods = ['PUT']

    def __init__(self, path, files):
        self.files = files
        self.path = path

    # This is very similar to PostableView
    # find a way to merge these?
    def dispatch_request(self, id):
        data = request.get_json()

        for file in self.files:
            filename = file[:-5]
            data_to_write = dumps(data[filename])

            path = self.path + "/" + id + "/" + file

            writer = open(self.data_root + path, "w")
            writer.write(data_to_write)
            writer.close()

        return self.return_response("Sucess", 200)

    def bind(bp: Blueprint, view_type: BindableView, path, files, **extras):
        IndexableView.bind(bp, path, files)

        bp.add_url_rule("/<id>",
            view_func=view_type.as_view("/" + path,
                path=path,
                files=files,
                **extras)
        )
