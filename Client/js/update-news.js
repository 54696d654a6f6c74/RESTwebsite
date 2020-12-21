import { getHeaders, generateNavigationElement } from "./delete-news.js";
import { generateNav } from "./navigator.js";

const Attribute = require("@54696d654a6f6c74/html-injector").Attribute;

generateNav("operation-target-select.html");

async function showHeaders(headers, target)
{
    headers = await headers;
    document.getElementById(target).innerHTML = "";
    for(let i = 0; i < headers.length; i++)
    {   
        let header = JSON.parse(headers[headers.length - i - 1]);

        let item = await generateNavigationElement(header, headers.length - i - 1);
        
        item.atribs.push(new Attribute("href", "update-news-fill.html"));

        document.getElementById(target).innerHTML += item.stringify;
    }
}

showHeaders(getHeaders(), "insert-target");
