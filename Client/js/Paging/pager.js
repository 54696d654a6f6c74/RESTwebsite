var injector = require("@54696d654a6f6c74/html-injector").Injector;

export default class Pager
{
    constructor(totalPages, path, currentPage = undefined)
    {
        this.totalPages = totalPages;
        this.currentPage = currentPage != undefined ? currentPage : 1;
        this.path = path;
    }

    generate(template)
    {
        let pager = [];

        for(let i = 1; i <= this.totalPages; i++)
            pager.push(template(i, page, i == this.currentPage));

        return pager;
    }

    render(target, template)
    {
        let pager = this.generate(template);
        console.log(pager);
        injector.bindHTML(pager, target);
    }
}

function page()
{
    localStorage["page"] = this.value;
    console.log(localStorage["page"]);
    location.reload();
}