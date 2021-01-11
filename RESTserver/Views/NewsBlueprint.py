from Views.GenericViews.ListableView import ListableView

from json import dumps
from os import listdir


class NewsView(ListableView):
    def __init__(self, sorted: bool, path):
        super().__init__(sorted, path)

    def index_data(self):
        return listdir("./data/news")

    def get(self):
        return dumps(self.get_header_data(self.sorted))
