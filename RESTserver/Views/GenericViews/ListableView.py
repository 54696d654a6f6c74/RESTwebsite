from flask import Blueprint

from Views.GenericViews.BindableView import BindableView

from os import listdir
from json import dumps


class ListableView(BindableView):
    methods = ['GET']

    def __init__(self, sorted, path, files_path):
        self.sorted = sorted
        self.path = path
        self.files_path = files_path

    def index_data(self, sortFiles, path):
        files = map(int, listdir(path))

        if sortFiles:
            return sorted(files)
        return files

    def iterate_data(self, data):
        headers = []

        # multi threading can speed this up

        for i in data:
            header = open(self.path.format(i))
            headers.append(header.read())
            header.close()
        return headers

    def get_header_data(self, sortHeaders=True):
        print(self.files_path)
        allHeaders = self.index_data(sortHeaders, self.files_path)

        return self.iterate_data(allHeaders)

    def dispatch_request(self):
        return dumps(self.get_header_data(self.sorted))

    def bind(bp: Blueprint, view_type: BindableView, file_path, path, **extras):
        bp.add_url_rule(
                        "",
                        view_func=view_type.as_view(path,
                                                    sorted=False,
                                                    path=view_type.data_root + path + file_path,
                                                    files_path=view_type.data_root + path,
                                                    **extras)
        )

        bp.add_url_rule(
                        "/sorted",
                        view_func=view_type.as_view(path+"/sorted",
                                                    sorted=True,
                                                    path=view_type.data_root + path + file_path,
                                                    files_path=view_type.data_root + path,
                                                    **extras)
        )

        return True
