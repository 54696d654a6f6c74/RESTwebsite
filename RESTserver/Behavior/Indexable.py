from flask import Blueprint

from json import loads

from os import mkdir
from os.path import exists


class Indexable:
    """
    Behavior for data that can be accessed
    via enumerable indecies
    """
    def __init__(self, path: str, files: []):
        self.path = path
        self.files = files

        if not exists(path):
            mkdir(path)

    def get_data_for_index(self, index: int) -> dict:
        data_dict = {}

        for file in self.files:
            io_file = open(f"{self.path}/{str(index)}/{file}.json", "r")

            data = loads(io_file.read())

            io_file.close()

            data_dict[file] = data

        return data_dict

    def get_data_for_item(self, index: int, file_name: str) -> dict:
        io_file = open(f"{self.path}/{str(index)}/{file_name}.json", "r")

        data = loads(io_file.read())

        io_file.close()

        return data

    def bind(self, bp: Blueprint):
        bp.add_url_rule("/<int:index>",
            view_func = self.get_data_for_index,
            methods = ['GET']
        ),

        bp.add_url_rule("/<int:index>/<string:file_name>",
            view_func = self.get_data_for_item,
            methods = ['GET']
        )
