class Pagelist:
    def __init__(self, page_size: int, base: [] = None):
        self.page_size = page_size

        self.items = []

        if base is not None:
            for item in base:
                self.add(item)

    def get_page(self, page: int) -> []:
        return self.items[page]

    def add(self, item):
        if len(self.items) == 0:
            self.items.append([item])
        elif len(self.items[len(self.items) - 1]) < self.page_size:
            self.items[len(self.items) - 1].append(item)
        else:
            self.items.append([item])
