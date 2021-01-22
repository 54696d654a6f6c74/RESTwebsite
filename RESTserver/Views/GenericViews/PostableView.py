from Views.GenericViews.ListableView import ListableView

from flask import Blueprint, request

from os import mkdir
from json import dumps


class PostableView(ListableView):
    methods = ['GET', 'POST']

    def __init__(self, sorted, path, files_path, files):
        ListableView.__init__(self, sorted, path, files_path)
        self.files = files

    def dispatch_request(self):
        if request.method == 'GET':
            return ListableView.dispatch_request(self)
        else:
            allFiles = self.index_data(True)

            path = None

            if len(allFiles) > 0:
                path = self.filies_path + "/" + str(allFiles[len(allFiles)-1] + 1)
            else:
                path = self.filies_path + "1"

            print(path)

            mkdir(path)

            data = request.get_json()

            for file in self.files:
                filename = file[:-5]
                data_to_write = data[filename]

                writer = open(path + "/" + path, "w")
                writer.write(dumps(data_to_write))
                writer.close()

            return self.return_response("Succsess", 200)

    def bind(bp: Blueprint, file_path, path, files):
        ListableView.bind(bp, PostableView, file_path, path, files=files)
