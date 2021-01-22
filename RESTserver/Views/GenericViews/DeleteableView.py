from Views.GenericViews.UpdateableView import UpdateableView

from flask import Blueprint, make_response, jsonify, request

from shutil import rmtree


# Maybe this shouldn't bind IndexableView
class DeleteableView(UpdateableView):
    methods = ['PUT', 'DELETE']

    def dispatch_request(self, id):
        if request.method == 'PUT':
            return UpdateableView.dispatch_request(self, id)

        message = "Succsess"
        code = 200

        path = DeleteableView.data_root + self.path + "/" + id

        try:
            rmtree(path)
        except FileNotFoundError:
            message = "Could not find the file at " + path
            code = 404

        return make_response(jsonify({"message": message}), code)

    def bind(bp: Blueprint, path, files):
        UpdateableView.bind(bp, DeleteableView, path, files)
