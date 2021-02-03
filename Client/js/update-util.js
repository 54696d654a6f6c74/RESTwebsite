import { addRequest } from "./common.js";
import { httpGet } from "../../Public/js/utils.js";

function fill(type)
{
    switch(type)
    {
        case 'news':
            
        break;

        case 'contacts':

        break;
    }
}

// This needs work
async function fillNews()
{
    const data = await httpGet("/news/headers/sorted");

}

function fillContacts()
{

}