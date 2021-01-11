from flask import Blueprint

from Views.GenericViews.BindableView import BindableView


class ListableView(BindableView):
    def __init__(self, sorted, path):
        self.sorted = sorted
        self.path = path

    def index_data(self):
        raise NotImplementedError()

    def iterate_data(self, data):
        headers = []

        # multi threading can speed this up
        print(data)

        for i in data:
            header = open(self.path.format(i))
            headers.append(header.read())
            header.close()
        return headers

    def get_header_data(self, sortHeaders=True):
        allHeaders = None
        if sortHeaders:
            allHeaders = sorted(map(int, self.index_data()))
        else:
            allHeaders = map(int, self.index_data())

        return self.iterate_data(allHeaders)

    def bind(bp: Blueprint, view_type, file_path, path):
        bp.add_url_rule(
                        "",
                        view_func=view_type.as_view(path,
                                                    sorted=False,
                                                    path=file_path)
        )

        bp.add_url_rule(
                        "/sorted",
                        view_func=view_type.as_view(path+"/sorted",
                                                    sorted=True,
                                                    path=file_path)
        )

        return True
