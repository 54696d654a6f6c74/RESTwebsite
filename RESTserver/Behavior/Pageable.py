from Behavior.Listable import Listable
from Pagination.pagelist import Pagelist

from flask import request


class Pageable(Listable):
    def __init__(self, path: str, files: [], header_file_name: str, page_size: int):
        super().__init__(path, files, header_file_name)
        self.page_size = page_size

    def get_all_data(self, sort_data: bool) -> []:
        data = super().get_all_data(sort_data)

        page = request.args.get('page', 1, int)

        try:
            items = Pagelist(self.page_size, data)

            return items.get_page(page - 1)
        except IndexError:
            return []
