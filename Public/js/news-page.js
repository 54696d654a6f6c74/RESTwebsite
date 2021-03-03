import * as utils from './utils.js';

async function getNewsPart(part)
{
    // A validation step could be done before returning
    return await utils.httpGet("news/" + localStorage["selectedNews"] + "/" + part);
}

function displayNewsHeader(header)
{
    document.getElementById("news-content").innerHTML += 
    `
    <div id="article-header">
        <h2> ${header.title} </h2>
        <h4>Автор: ${header.author} </h4>
    </div>
    `
}

function displayNewsContent(content)
{
    document.getElementById("news-content").innerHTML += 
    `
    <div id="article-content">
        <p> ${content.fill} </p>    
    </div>
    `
}
async function load(){
    await getNewsPart("header").then((header) => displayNewsHeader(header));
    await getNewsPart("content").then((content) => displayNewsContent(content));
}
load();