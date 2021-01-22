from Views.GenericViews.PostableView import PostableView
from Views.GenericViews.DeleteableView import DeleteableView

from flask import Blueprint


class NewsView(PostableView, DeleteableView):
    def bind(bp: Blueprint, file_path, path, files):
        PostableView.bind(bp, file_path, path, files)
        DeleteableView.bind(bp, path, files)
