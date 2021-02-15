// Maybe move this here?
import { generateInputs } from "../common.js";

export class DataType
{
    typename;
    data;
    inputStrcture;

    constructor(inputfieldTitles, inputfieldTypes)
    {
        if(inputfieldTypes.length != inputfieldTitles.length)
            throw new Error("The amount of titles must match the amount of fields");
        
        this.inputStrcture = {}

        for(let i = 0; i < inputfieldTypes.length; i++)
            this.inputStrcture[inputfieldTitles[i]] = inputfieldTypes[i];
    }

    generateInputs(request)
    {
        const titles = Object.keys(this.inputStrcture);
        const types = Object.values(this.inputStrcture);

        return generateInputs(titles, types, () => this.submit(request))
    }

    submit()
    {
        throw Error("Cannot call this fucntion from a base class");
    }

    async getDataFromServer()
    {
        throw Error("Cannot call this function from a base class");
    }

    async writeServerData()
    {
        const serverData = await this.getDataFromServer();
        let counter = 0;

        for(const input in this.inputStrcture)
        {
            console.log(input);
            document.getElementById(input.toLowerCase()).value = serverData[counter];
            counter++;
        }
    }

    getDataFromInputs()
    {
        let data = [];
        for(const input in this.inputStrcture)
            data.push(document.getElementById(input.toLowerCase()).value);
        
        return data;
    }

    sendSubmitRequest(reqType)
    {
        let path = this.typename;
        if (reqType == 'PUT')
            path += "/" + localStorage["updateArticle"];

        fetch("http://127.0.0.1:5000/" + path, {
            method: reqType,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.data)
        })
    }
}
