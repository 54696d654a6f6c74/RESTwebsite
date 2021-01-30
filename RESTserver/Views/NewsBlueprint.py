from Views.GenericViews.PostableView import PostableView
from Views.GenericViews.DeleteableView import DeleteableView

from flask import Blueprint


class NewsView(PostableView):
    def bind(bp: Blueprint, file_path, path, files):
        DeleteableView.bind(bp, file_path, path, files)
