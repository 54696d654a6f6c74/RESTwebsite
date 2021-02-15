import { DataType } from "./data-type.js";
import { httpGet } from "../../../Public/js/utils.js";

const md = require("markdown").markdown;

export class News extends DataType
{
    constructor()
    {
        const titles = ["Title", "Author", "Content"];
        const types = ["text-input", "text-input", "md-input"];

        super(titles, types);

        this.typename = "news";
    }

    submit(reqType)
    {
        const inputData = this.getDataFromInputs();

        const header = {
            title: inputData[0],
            author: inputData[1],
            date: new Date().toLocaleString()
        }

        const md_dat = {
            md: inputData[2]
        };

        const content = {
            fill: md.toHTML(md_dat.md)
        };

        const json = {
            header: header,
            md: md_dat,
            content: content
        }

        this.data = json;

        this.sendSubmitRequest(reqType);
    }

    async getDataFromServer()
    {
        let id = localStorage["updateArticle"];
        let info = await httpGet(localStorage["operationTarget"] + "/" + id + "/header");
        info = JSON.parse(info);

        const retrived = [];
        retrived.push(info.title);
        retrived.push(info.author);

        info = await httpGet(localStorage["operationTarget"] + "/" + id + "/md");
        info = JSON.parse(info);

        retrived.push(info.md);

        return retrived;
    }
}
