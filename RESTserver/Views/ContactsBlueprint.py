from Views.GenericViews.ListableView import ListableView

from os import listdir
from json import dumps


class ContactsView(ListableView):
    def __init__(self, sorted, path):
        super().__init__(sorted, path)

    def index_data(self):
        return listdir("./data/contacts")

    def get(self):
        return dumps(self.get_header_data(self.sorted))
