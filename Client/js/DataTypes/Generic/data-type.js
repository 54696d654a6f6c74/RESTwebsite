const Attribute = require("@54696d654a6f6c74/html-injector").Attribute;
const _ = require("lodash");

// This import is purely for documentation reasons
// if a better way of doing this is discovered
// remove this import ASAP
const Tag = require("@54696d654a6f6c74/html-injector").Tag;

/**
 * @abstract
 * @classdesc Base class for all data types
 */
export default class DataType
{
    RESTroot;
    data;
    inputStrcture;
    static href = localStorage["operationType"] + ".html";

    static availableOperations;
    static titleProperty;

    constructor(inputfieldTitles, inputfieldTypes)
    {
        if(inputfieldTypes.length != inputfieldTitles.length)
            throw new Error("The amount of titles must match the amount of fields");
        
        this.inputStrcture = {}

        for(let i = 0; i < inputfieldTypes.length; i++)
            this.inputStrcture[inputfieldTitles[i]] = inputfieldTypes[i];
    }

    /**
     * The input fields as array of injectable
     * objects associated with this this DataType
     * 
     * @public @method
     * @param {string} request
     * @returns {[Tag | {}]} the inputs associated with this DataType
     */
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

        // Ensures the onClick will call the submit fucntion
        window.onload = () => {
            document.getElementById("submit").addEventListener("click", () => this.submit(request));
        };

        return generated_inputs;
    }

    /**
     * The function attatched to the submit button
     * on the input page for this data type
     * 
     * @protected @abstract @method
     */
    submit()
    {
        throw Error("Cannot call this fucntion from a base class");
    }

    /**
     * Sends a GET request to the REST server
     * and returns the response
     * 
     * @protected @abstract @async @method
     */
    async getDataFromServer()
    {
        throw Error("Cannot call this function from a base class");
    }

    /**
     * Retrives data from the REST server and writes
     * it into the input fields of this DataType
     * 
     * @protected @async @method
     */
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

    /**
     * Reads the inputs for this type
     * and returns an array that contains
     * the data from each input
     */
    getDataFromInputs()
    {
        let data = [];
        for(const input in this.inputStrcture)
            data.push(document.getElementById(input.toLowerCase()).value);
        
        return data;
    }

    /**
     * Sends an HTTP request of type "reqType"  
     * to the REST server
     */
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
