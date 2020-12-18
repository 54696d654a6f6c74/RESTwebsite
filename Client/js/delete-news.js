import { getNavigationElement } from "../templates/elements.js";
import { generateNav } from "./navigator.js";

export async function getHeaders()
{
    let headers = await fetch("http://127.0.0.1:5000/news/headers").catch(err => {console.log(err);})
    .then((dat) => {return dat.json();}).catch(err => {console.log(err);})
    .then((dat) => {return dat;}).catch(err => {console.log(err);})

    document.getElementById("insert-target").innerHTML = "";

    // They're displayed in wrong order since the server
    // cannot query its file system in the correct order.
    // This is a serverside issue and you be fixed there

    for(let i = 0; i < headers.length; i++)
    {   
        let header = JSON.parse(headers[headers.length - i - 1]);

        let item = getNavigationElement("", "selectArticle", headers.length - i - 1, header.title, i.toString());

        document.getElementById("insert-target").innerHTML += item.stringify;
    }
}

document.body.innerHTML = generateNav(["main-select.html"]).stringify + document.body.innerHTML;
getHeaders();
