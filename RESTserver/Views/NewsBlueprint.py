from Views.GenericViews.DeleteableView import DeleteableView

from flask import Blueprint


class NewsView(DeleteableView):
    def bind(bp: Blueprint, file_path, path, files):
        DeleteableView.bind(bp, file_path, path, files)
