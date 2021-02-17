from Behavior.Postable import Postable
from Behavior.Deleteable import Deleteable
from Behavior.Updateable import Updateable

from flask.views import MethodView


class ContactsView(Postable, Deleteable, Updateable, MethodView):
    def __init__(self, path: str, files: [], header_file_name: str):
        Postable.__init__(self, path, files, header_file_name)
        Deleteable.__init__(self, path, files)
        Updateable.__init__(self, path, files)
