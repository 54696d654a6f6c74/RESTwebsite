import { DataType } from "./Generic/data-type.js";
import { httpGet } from "../../../Public/js/utils.js";
import { mdInput } from "../../templates/elements.js";

const md = require("markdown").markdown;

export class AboutUs extends DataType
{
    constructor()
    {
        const titles = ["Content"];
        const types = [mdInput];

        super(titles, types);
        
        this.RESTroot = "aboutus";
    }

    submit(reqType)
    {
        const inputData = this.getDataFromInputs();

        const json = {
            md: {
                contnet: inputData[0]
            },
            aboutus: {
                content: md.toHTML(inputData[0])
            }
        }

        this.data = json

        this.sendSubmitRequest(reqType, false)
    }

    async getDataFromServer()
    {
        const retrived = [];

        let info = await httpGet(localStorage["operationTarget"] + "/" + "md")

        retrived.push(info.contnet)

        return retrived
    }
}