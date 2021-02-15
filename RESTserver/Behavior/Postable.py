from Behavior.Listable import Listable

from os import mkdir
from json import dumps


class Postable(Listable):
    def write_data(self, data: dict):
        all_files = self.get_all_data(True)

        target = None

        if len(all_files) > 0:
            target = f"{self.path}/{str(all_files[len(all_files) - 1] + 1)}"
        else:
            target = f"{self.path}/1"

        mkdir(target)

        for file in self.files:
            data_to_write = data[file]

            writer = open(f"{target}/{file}.json", "w")
            writer.write(dumps(data_to_write))

            writer.close()
