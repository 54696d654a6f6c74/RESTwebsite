from Behavior.Indexable import Indexable

from json import dumps


class Updateable(Indexable):
    def update_file(self, data: dict, file_name: str, index: int):
        data_to_write = dumps(data[file_name])

        target = f"{self.path}/{str(index)}/{file_name}.json"

        writer = open(target, "w")
        writer.write(data_to_write)
        writer.close()

    def update_all_files(self, data: dict, index: int):
        for file in self.files:
            self.update_file(data, file, index)
