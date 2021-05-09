from Behavior.Listable import Listable
from Pagination.pagelist import Pagelist

from flask import request, Blueprint

from math import ceil


class Pageable(Listable):
    """
    Behavior for listable data that
    supports pagination
    """
    def __init__(self, path: str, files: [], header_file_name: str, page_size: int):
        super().__init__(path, files, header_file_name)
        self.page_size = page_size

    def get_all_data(self, sort_data: bool) -> []:
        data = super().get_all_data(sort_data)

        if request.args.get('all', False, bool) is True:
            return data

        page = request.args.get('page', 1, int)

        try:
            items = Pagelist(self.page_size, data)

            return items.get_page(page - 1)
        except IndexError:
            return []

    def get_page_count(self) -> int:
        data = list(super().get_all_data(False))
        print(data)
        pages = ceil(len(data) / self.page_size)

        return {
            "pages": pages
        }

    def bind(self, bp: Blueprint):
        bp.add_url_rule("/pages",
            view_func = self.get_page_count,
            methods = ['GET']
        )
