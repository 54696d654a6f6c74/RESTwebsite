from Behavior.Indexable import Indexable
from Behavior.Listable import Listable
from Behavior.Pageable import Pageable

from Behavior.Postable import Postable
from Behavior.Deleteable import Deleteable
from Behavior.Updateable import Updateable

from flask import Blueprint


class NewsView(Postable, Deleteable, Updateable, Pageable):
    def bind(self, bp: Blueprint):
        Indexable.bind(self, bp)
        Listable.bind(self, bp)
        Pageable.bind(self, bp)
        Postable.bind(self, bp)
        Deleteable.bind(self, bp)
        Updateable.bind(self, bp)
