from Behavior.Indexable import Indexable

from flask import Response, Blueprint, request

from json import dumps


class Updateable(Indexable):
    def update(self, data: dict, file_name: str, index: int):
        data_to_write = dumps(data[file_name])

        target = f"{self.path}/{str(index)}/{file_name}.json"

        writer = open(target, "w")
        writer.write(data_to_write)
        writer.close()

    def update_file(self, file_name: str, index: int) -> Response:
        data = request.get_json()

        self.update(data, file_name, index)

        return Response(status = 200)

    def update_all_files(self, index: int) -> Response:
        data = request.get_json()

        for file in self.files:
            self.update(data, file, index)

        return Response(status = 200)

    def bind(self, bp: Blueprint):
        bp.add_url_rule("/<int:index>",
            view_func = self.update_all_files,
            methods = ['PUT']
        )

        bp.add_url_rule("/<int:index>/<string:file_name>",
            view_func = self.update_file,
            methods = ['PUT']
        )
