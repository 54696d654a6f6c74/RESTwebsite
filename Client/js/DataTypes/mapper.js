// There has to be a better way of doing this...
import types from "./linker.js";

export function getDataType()
{
    for(let type of Object.entries(types))
    {
        if(type[0].toLowerCase()
            == localStorage["operationTarget"])
            return type[1];
    }
    return undefined
}

export function getDataHeaderTitle()
{
    const type = getDataType();
    return type.titleProperty;
}

export function getAvailableTypes(operation = undefined)
{
    if(operation == undefined)
        operation = localStorage["operationType"];

    let available = [];

    for(let type of Object.entries(types))
    {
        for(let op of type[1].availableOperations)
        {
            console.log(op);
            if(op == operation)
                available.push("'" + type[0].toLowerCase() + "'");
        }
    }

    return available
}

export function getAvailableOperations(operation = undefined)
{
    if(operation == undefined)
        operation = localStorage["operationType"];

        let available = [];

        for(let type of Object.entries(types))
        {
            for(let op of type[1].availableOperations)
            {
                if(op == operation)
                    available.push(type[0]);
            }
        }
    
        return available
}

export function getHrefs(operation = undefined)
{
    if(operation == undefined)
        operation = localStorage["operationType"];

    const hrefs = [];

    for (let type of Object.entries(types))
        hrefs.push(type[1].href);
    return hrefs;
}
