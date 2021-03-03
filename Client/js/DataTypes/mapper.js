import types from "./linker.js";

/**
 * Maps the string representation of a
 * data type into a type reference
 */
export function getDataType()
{
    // type[0] holds the name of the class
    // type[1] holds a reference to the class
    for(let type of Object.entries(types))
    {
        if(type[0].toLowerCase()
            == localStorage["operationTarget"])
            return type[1];
    }
    return undefined
}

/**
 * Returns the title property of the
 * selected data type
 */
export function getDataHeaderTitle()
{
    const type = getDataType();
    return type.titleProperty;
}

/**
 * Returns an array of string 
 * representations of the available
 * data types for the selected operation
 */
export function getAvailableTypes(operation = undefined)
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

/**
 * Returns an array of hrefs
 * for each operation available
 * for the selected operation
 */
export function getHrefs(operation = undefined)
{
    if(operation == undefined)
        operation = localStorage["operationType"];

    const hrefs = [];

    for (let type of Object.entries(types))
        hrefs.push(type[1].href);
    return hrefs;
}
