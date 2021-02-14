// There has to be a better way of doing this...
import { News } from "./news.js";
import { Contacts } from "./contacts.js";

export function getDataType()
{
    switch(localStorage["operationTarget"])
    {
        case "news":
            return new News();
        case "contacts":
            return new Contacts();
    }
}