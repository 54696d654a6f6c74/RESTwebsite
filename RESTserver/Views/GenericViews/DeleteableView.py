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

        # Turns out there might isn't any elegant way
        # to link the filesystem's <id> index to the
        # index in the array. If a solution is to be
        # devised, it has to be on the JS side.
        # Maybe send IDs/Filenames along with the data?

        allFiles = self.index_data(True, DeleteableView.data_root + self.path)
        print(allFiles)
        print(id)

        path = DeleteableView.data_root + self.path + "/" + str(allFiles[int(id)])

        try:
            rmtree(path)
        except FileNotFoundError:
            message = "Could not find the file at " + path
            code = 404

        return make_response(jsonify({"message": message}), code)

    def bind(bp: Blueprint, files_path, path, files):
        PostableView.bind(bp, PostableView, files_path, path, files)
        UpdateableView.bind(bp, DeleteableView, path, files)
