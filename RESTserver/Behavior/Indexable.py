from json import loads


class Indexable:
    def __init__(self, path: str, files: []):
        self.path = path
        self.files = files

    def get_data_for_index(self, index: int) -> dict:
        data_dict = {}

        for file in self.files:
            io_file = open(f"{self.path}/{str(index)}/{file}.json", "r")

            data = loads(io_file.read())

            io_file.close()

            data_dict[file] = data

        return data_dict

    def get_data_for_item(self, index: int, filename: str) -> dict:
        io_file = open(f"{self.path}/{str(index)}/{filename}.json", "r")

        data = loads(io_file.read())

        io_file.close()

        return data
