import * as utils from './utils.js';

async function getNewsPart(part)
{
    // A validation step could be done before returning
    return await utils.httpGet("news/" + localStorage["selectedNews"] + "/" + part);
}

function displayNewsHeader(header)
{
    header = JSON.parse(header);
    document.getElementById("news-content").innerHTML += "<h2>" + header.title + "</h2>";
    document.getElementById("news-content").innerHTML += "<h4>Автор: " + header.author + "</h4>";
}

function displayNewsContent(content)
{
    content = JSON.parse(content)
    document.getElementById("news-content").innerHTML += "<p>" + content.fill + "</p>";    
}
async function load(){
    await getNewsPart("header").then((header) => displayNewsHeader(header));
    await getNewsPart("content").then((content) => displayNewsContent(content));
}
load();