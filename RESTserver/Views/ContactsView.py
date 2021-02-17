from Behavior.Indexable import Indexable
from Behavior.Listable import Listable

from Behavior.Postable import Postable
from Behavior.Deleteable import Deleteable
from Behavior.Updateable import Updateable

from flask import Blueprint


class ContactsView(Postable, Deleteable, Updateable):
    def __init__(self, path: str, files: [], header_file_name: str):
        Postable.__init__(self, path, files, header_file_name)
        Deleteable.__init__(self, path, files)
        Updateable.__init__(self, path, files)

    def bind(self, bp: Blueprint):
        Indexable.bind(self, bp)
        Listable.bind(self, bp)
        Postable.bind(self, bp)
        Deleteable.bind(self, bp)
        Updateable.bind(self, bp)
