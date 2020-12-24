import { writeElements } from "./common.js";

const _ = require("lodash");

// This should not be here
export async function getHeaders()
{
    let headers = await fetch("http://127.0.0.1:5000/news/headers").catch(err => {console.log(err);})
    .then((dat) => {return dat.json();}).catch(err => {console.log(err);})
    .then((dat) => {return dat;}).catch(err => {console.log(err);})
    
    return headers;        
}

async function injectHeaders(headers, target)
{
    // They're displayed in wrong order since the server
    // cannot query its file system in the correct order.
    // This is a serverside issue and you be fixed there
    headers = await headers;
    document.getElementById(target).innerHTML = "";

    for(let i = 0; i < headers.length; i++)
    {   
        let header = JSON.parse(headers[headers.length - i - 1]);
        writeElements("insert-target", header.title, "selectArticle", headers.length - i - 1);       
    }
}

injectHeaders(getHeaders(), "insert-target");
