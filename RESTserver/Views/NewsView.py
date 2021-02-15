from Behavior.Postable import Postable
from Behavior.Deleteable import Deleteable
from Behavior.Updateable import Updateable

from flask.views import MethodView
from flask import request, Response


class NewsView(Postable, Deleteable, Updateable, MethodView):
    def __init__(self, path: str, files: [], header_file_name: str):
        Postable.__init__(self, path, files, header_file_name)
        Deleteable.__init__(self, path, files)
        Updateable.__init__(self, path, files)

    def get(self, id: int, sort: bool, file_name: str):
        if id is None and file_name is None:
            return self.get_header_data(sort)
        elif file_name is None:
            try:
                return self.get_data_for_index(id)
            except FileNotFoundError:
                return Response(status = 404)
        else:
            try:
                return self.get_data_for_item(id, file_name)
            except FileNotFoundError:
                return Response(status = 404)

    def post(self):
        data = request.get_json()

        self.write_data(data)

        return Response(status = 201)

    def delete(self, id: int):
        try:
            self.delete_folder(id)
        except FileNotFoundError:
            return Response(status = 404)
        return Response(200)

    def put(self, id: int, file_name: str):
        data = request.get_json()

        if file_name is None:
            self.update_all_files(data, id)
        else:
            self.update_file(data, file_name, id)

        return Response(status = 200)
