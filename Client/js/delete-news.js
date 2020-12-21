import { navEle } from "../templates/elements.js";
import { generateNav } from "./navigator.js";

const _ = require("lodash");
const Attribute = require("@54696d654a6f6c74/html-injector").Attribute;

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

        let item = await generateNavigationElement(header, headers.length - i - 1);

        document.getElementById(target).innerHTML += item.stringify;
    }
}

export async function generateNavigationElement(header, id)
{
    header = await header;

    let nav = _.cloneDeep(navEle);
    
    nav.content[0].content = header.title;
    nav.atribs.push(new Attribute("onclick", `selectArticle(${id})`));
    
    return nav;
}

document.body.innerHTML = generateNav(["main-select.html"]).stringify + document.body.innerHTML;
injectHeaders(getHeaders(), "insert-target");
