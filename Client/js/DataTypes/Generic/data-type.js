const Attribute = require("@54696d654a6f6c74/html-injector").Attribute;
// Maybe move this here?
const _ = require("lodash");

export class DataType
{
    RESTroot;
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

        let generated_inputs = []

        for(let i = 0; i < titles.length; i++)
        {
            let input = _.cloneDeep(types[i]);
            
            input[0].content = titles[i];
            input[1].atribs.push(new Attribute("id", titles[i].toLowerCase()));

            generated_inputs.push(input);
        }

        window.onload = () => {
            document.getElementById("submit").addEventListener("click", () => this.submit(request));
        };

        // return generateInputs(titles, types, () => this.submit(request))
        return generated_inputs;
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

    sendSubmitRequest(reqType, idCarrier = true)
    {
        let path = this.RESTroot;
        if (reqType == 'PUT' && idCarrier)
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
