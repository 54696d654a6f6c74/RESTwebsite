import { getHeaders } from "./delete-news.js";
import { writeElements } from "./common.js";

async function showHeaders(headers, target)
{
    headers = await headers;
    document.getElementById(target).innerHTML = "";
    for(let i = 0; i < headers.length; i++)
    {   
        let header = JSON.parse(headers[headers.length - i - 1]);

        writeElements(target, header.title, "selectArticle", headers.length - i - 1, "update-news-fill.html");
    }
}

showHeaders(getHeaders(), "insert-target");
