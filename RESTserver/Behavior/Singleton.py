from flask import request, Blueprint, Response

from json import loads, dumps

from os import mkdir
from os.path import exists


class Singleton():
    """
    Behavior for data that is unique.
    Can only accept PUT and GET requests.
    """
    def __init__(self, path: str, file_name: str):
        self.path = path
        self.file_name = file_name

        if not exists(path):
            mkdir(path)

    def get_file_data(self, file):
        try:
            file = open(f"{self.path}/{file}.json", "r")

            data = loads(file.read())

            file.close()
        except FileNotFoundError:
            file = open(f"{self.path}/{file}.json", "w")

            dummy = {"content": ""}
            file.write(dumps(dummy))

            return dummy
        return data

    def get_data(self):
        try:
            data = self.get_file_data(self.file_name)
        except FileNotFoundError:
            return Response(status = 404)

        return data

    def get_md(self):
        try:
            data = self.get_file_data("md")
        except FileNotFoundError:
            return Response(status = 404)

        return data

    def update(self, data: dict, file_name: str):
        data_to_write = dumps(data[file_name])

        target = f"{self.path}/{file_name}.json"

        writer = open(target, "w")
        writer.write(data_to_write)
        writer.close()

    def update_file(self, file_name: str):
        data = request.get_json()

        try:
            self.update(data, file_name)
        except KeyError or FileNotFoundError:
            return Response(status = 404)

        return Response(status = 200)

    def update_all_files(self):
        data = request.get_json()

        self.update(data, self.file_name)
        self.update(data, "md")

        return Response(status = 200)

    def bind(self, bp: Blueprint):
        bp.add_url_rule("",
            view_func = self.get_data,
            methods = ['GET']
        )

        bp.add_url_rule("/md",
            view_func = self.get_md,
            methods = ['GET']
        )

        bp.add_url_rule("/<string:file_name>",
            view_func = self.update_file,
            methods = ['PUT']
        )

        bp.add_url_rule("",
            view_func = self.update_all_files,
            methods = ['PUT']
        )
