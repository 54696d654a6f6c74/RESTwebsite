from Behavior.Indexable import Indexable
from Behavior.Pageable import Pageable

from Behavior.Postable import Postable
from Behavior.Deleteable import Deleteable
from Behavior.Updateable import Updateable

from flask import Blueprint


class NewsView(Postable, Deleteable, Updateable, Pageable):
    def __init__(self, path: str, files: [], header_file_name: str):
        Pageable.__init__(self, path, files, header_file_name, 2)
        Postable.__init__(self, path, files, header_file_name)
        Deleteable.__init__(self, path, files)
        Updateable.__init__(self, path, files)

    def bind(self, bp: Blueprint):
        Indexable.bind(self, bp)
        Pageable.bind(self, bp)
        Postable.bind(self, bp)
        Deleteable.bind(self, bp)
        Updateable.bind(self, bp)
