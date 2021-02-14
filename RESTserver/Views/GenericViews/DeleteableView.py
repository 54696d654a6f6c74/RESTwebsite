from Views.GenericViews.UpdateableView import UpdateableView
from Views.GenericViews.PostableView import PostableView

from flask import Blueprint, make_response, jsonify, request

from shutil import rmtree


class DeleteableView(UpdateableView, PostableView):
    methods = ['PUT', 'DELETE']

    def __init__(self, path, files):
        UpdateableView.__init__(self, path, files)

    def dispatch_request(self, id):
        if request.method == 'PUT':
            return UpdateableView.dispatch_request(self, id)

        message = "Succsess"
        code = 200

        # This class should no longer derive from
        # ListableView since it no longer requires
        # the self.index_data() function!

        path = DeleteableView.data_root + self.path + "/" + id

        try:
            rmtree(path)
        except FileNotFoundError:
            message = "Could not find the file at " + path
            code = 404

        return make_response(jsonify({"message": message}), code)

    def bind(bp: Blueprint, files_path, path, files):
        PostableView.bind(bp, PostableView, files_path, path, files)
        UpdateableView.bind(bp, DeleteableView, path, files)
