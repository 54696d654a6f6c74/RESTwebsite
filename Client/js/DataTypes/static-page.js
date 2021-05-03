import DataType from "./Generic/data-type.js";
import { httpGet } from "../../../Public/js/utils.js";
import { mdInput } from "../../templates/elements.js";

const md = require("marked");
md.setOptions(
    {
        headerIds: false
    }
);

class StaticPage extends DataType
{
    static availableOperations = ["update"];
    static href = "update-fill.html";
    constructor()
    {
        const titles = ["Content"];
        const types = [mdInput];

        super(titles, types);
    }

    submit(reqType)
    {
        const inputData = this.getDataFromInputs();

        const json = {
            md: {
                content: inputData[0]
            },
            data: {
                content: md(inputData[0])
            }
        }

        this.data = json

        this.sendSubmitRequest(reqType, false)
    }

    async getDataFromServer()
    {
        const retrived = [];

        let info = await httpGet(localStorage["operationTarget"] + "/" + "md")

        retrived.push(info.content)

        return retrived
    }
}

export class Entry extends StaticPage
{
    RESTroot = "entry";
}

export class FreePositions extends StaticPage
{
    RESTroot = "freepositions";
}

export class Projects extends StaticPage
{
    RESTroot = "projects";
}

export class Exams extends StaticPage
{
    RESTroot = "exams";
}

export class AboutUs extends StaticPage
{
    RESTroot = "aboutus";
}
