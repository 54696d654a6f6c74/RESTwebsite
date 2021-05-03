import types from "./linker.js";

// This import is here just fo documentation
// purposes, if there's a better way to do
// this, remove it ASAP!
import "./Generic/data-type.js";

/**
 * Maps the string representation of a
 * DataType into a type reference
 * 
 * @param {string} typeName
 * @returns {DataType} Type reference to a DataType
 */
export function getDataType(typeName = localStorage["operationTarget"])
{
    // type[0] holds the name of the class
    // type[1] holds a reference to the class
    for(let type of Object.entries(types))
    {
        if(type[0].toLowerCase()
            == typeName)
            return type[1];
    }
    return undefined
}

/**
 * Gets the title string for a slected DataType
 * 
 * @param {string} typeName
 * @returns {string} Title propery of type with typeName
 */
export function getDataHeaderTitle(typeName = localStorage["operationTarget"])
{
    const type = getDataType(typeName);
    return type.titleProperty;
}

/**
 * Available DataTypes based on selected operation
 * 
 * @param {string} operation
 * @returns {[string]} String representations to available DataTypes
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
 * Hrefs to available pages based on selected operation
 * 
 * @param {string} operation
 * @returns {[]} hrefs to available pages
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
