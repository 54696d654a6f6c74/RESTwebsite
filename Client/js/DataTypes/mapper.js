// There has to be a better way of doing this...
import { News } from "./news.js";
import { Contacts } from "./contacts.js";
import { AboutUs } from "./aboutus.js";

export function getDataType()
{
    switch(localStorage["operationTarget"])
    {
        case "news":
            return new News();
        case "contacts":
            return new Contacts();
        case "aboutus":
            return new AboutUs();
    }
}

export function getDataHeaderTitle()
{
    switch(localStorage["operationTarget"])
    {
        case "news":
            return "title";
        case "contacts":
            return "name";
        default:
            return undefined;    
    }
}

export function getAvailableTypes(operation = undefined)
{
    if(operation == undefined)
        operation = localStorage["operationType"];

    switch(operation)
    {
        case 'add':
            return ["'news'", "'contacts'"];
        case 'delete':
            return ["'news'", "'contacts'"];
        case 'update':
            return ["'news'", "'contacts'", "'aboutus'"];
    }
}

export function getAvailableTitles(operation = undefined)
{
    if(operation == undefined)
        operation = localStorage["operationType"];
    
    switch(operation)
    {
        case 'add':
            return ["Новини", "Контакти"];
        case 'delete':
            return ["Новини", "Контакти"];
        case 'update':
            return ["Новини", "Контакти", "За нас"];
    }
}

export function getHrefs(operation = undefined)
{
    if(operation == undefined)
        operation = localStorage["operationType"];
    
    let regular = localStorage["operationType"] + ".html";

    switch(operation)
    {
        case 'add':
            return regular;
        case 'delete': 
            return regular;
        case 'update':
            return [regular, regular, "update-fill.html"];
    }
}
