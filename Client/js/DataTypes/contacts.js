import { DataType } from "./Generic/data-type.js";
import { httpGet } from "../../../Public/js/utils.js";
import { textInput } from "../../templates/elements.js";

export class Contacts extends DataType
{
    constructor()
    {
        const titles = ["Names", "Phone number"];
        const types = [textInput, textInput];

        super(titles, types);

        this.RESTroot = "contacts";
    }

    submit(reqType)
    {
        const inputData = this.getDataFromInputs();

        const contact = {
            name: inputData[0],
            number: inputData[1]
        }

        const json = {
            details: contact
        }

        this.data = json;

        this.sendSubmitRequest(reqType)
    }

    async getDataFromServer()
    {
        let id = localStorage["updateArticle"];
        let info = await httpGet(localStorage["operationTarget"] + "/" + id + "/details");

        const retrived = [];
        retrived.push(info.name);
        retrived.push(info.number);

        return retrived
    }
}
