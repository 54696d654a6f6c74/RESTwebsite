from Behavior.Indexable import Indexable

from flask import Blueprint, Response

from shutil import rmtree


class Deleteable(Indexable):
    def delete_folder(self, index: int) -> Response:
        try:
            path = f"{self.path}/{str(index)}"

            rmtree(path)
        except FileNotFoundError:
            return Response(status = 404)
        return Response(status = 200)

    def bind(self, bp: Blueprint):
        bp.add_url_rule("/<int:index>",
            view_func = self.delete_folder,
            methods = ['DELETE']
        )
