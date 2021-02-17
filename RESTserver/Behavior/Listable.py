from Behavior.Indexable import Indexable

from flask import Blueprint

from os import listdir


class Listable(Indexable):
    def __init__(self, path: str, files: [], header_file_name: str):
        super().__init__(path, files)
        self.header_file_name = header_file_name

    def get_all_data(self, sort_data: bool) -> []:
        data = map(int, listdir(self.path))

        if sort_data:
            return sorted(data)
        return data

    def get_header_data(self, sort_data: bool) -> []:
        headers = []

        data = self.get_all_data(sort_data)

        for i in data:
            header = self.get_data_for_index(i)
            headers.append(header["header"])

        final_data = {
            "headers": headers,
            "indecies": list(data)
        }

        return final_data

    def sorted_data(self):
        return self.get_header_data(True)

    def unsorted_data(self):
        return self.get_header_data(False)

    def bind(self, bp: Blueprint):
        bp.add_url_rule("",
            view_func = self.unsorted_data, # self.get_header_data(True),
            methods = ['GET']
        )

        bp.add_url_rule("/sorted",
            view_func = self.sorted_data, # self.get_header_data(False),
            methods = ['GET']
        )
