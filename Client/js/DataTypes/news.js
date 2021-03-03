import { DataType } from "./Generic/data-type.js";
import { httpGet } from "../../../Public/js/utils.js";
import { textInput, mdInput } from "../../templates/elements.js";

const md = require("marked");
md.setOptions(
    {
        headerIds: false
    }
);

export default class News extends DataType
{
    static availableOperations = ["add", "delete", "update"];
    static titleProperty = "title";

    constructor()
    {
        const titles = ["Title", "Author", "Content"];
        const types = [textInput, textInput, mdInput];

        super(titles, types);

        this.RESTroot = "news";
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
            fill: md(md_dat.md)
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

        const retrived = [];
        retrived.push(info.title);
        retrived.push(info.author);

        info = await httpGet(localStorage["operationTarget"] + "/" + id + "/md");

        retrived.push(info.md);

        return retrived;
    }
}
