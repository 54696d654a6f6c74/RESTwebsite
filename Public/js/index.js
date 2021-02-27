import * as utils from './utils.js';

async function load()
{
    let data = await utils.httpGet("news/sorted");
    let headers = data.headers; 
    let indecies = data.indecies; // array

    let header = await utils.httpGet("news/" + indecies.length + "/" + "header");
    let content = await utils.httpGet("news/" + indecies.length + "/" + "content");

    document.getElementById("article-1").innerHTML += "<h2>" + header.title + "</h2>";
    document.getElementById("article-1").innerHTML += "<p>" + content.fill + "</p>";

    header = await utils.httpGet("news/" + (indecies.length - 1) + "/" + "header");
    content = await utils.httpGet("news/" + (indecies.length - 1) + "/" + "content");

    document.getElementById("article-2").innerHTML += "<h2>" + header.title + "</h2>";
    document.getElementById("article-2").innerHTML += "<p>" + content.fill + "</p>";
}

load();