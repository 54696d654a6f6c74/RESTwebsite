import { DataType } from "./data-type.js";

export class Contacts extends DataType
{
    constructor()
    {
        const titles = ["Names", "Phone number"];
        const types = ["text-input", "text-input"];

        super(titles, types);

        this.typename = "contacts";
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
}