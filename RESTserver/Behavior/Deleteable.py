from Behavior.Indexable import Indexable

from flask import Blueprint

from shutil import rmtree


class Deleteable(Indexable):
    def delete_folder(self, index: int) -> bool:
        path = f"{self.path}/{str(index)}"

        rmtree(path)

    def bind(self, bp: Blueprint):
        bp.add_url_rule("/<int:index>",
            view_func = self.delete_folder,
            methods = ['DELETE']
        )
