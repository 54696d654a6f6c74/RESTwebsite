from Behavior.Indexable import Indexable

from shutil import rmtree


class Deleteable(Indexable):
    def delete_folder(self, index: int) -> bool:
        path = f"{self.path}/{str(index)}"

        rmtree(path)
