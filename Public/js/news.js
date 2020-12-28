import * as utils from './utils.js';

function writeNewsArticle(id, title)
{
    document.getElementById("news-page-main").innerHTML += `
    <a onclick="selected(${id})" href="news-page.html">
        <h2 class="news-main-item">${title}</h2>
    </a>`;
}

async function load()
{
    let headers = await utils.getNewsPart("headers");
    let indecies = await utils.getNewsPart("indecies");

    document.getElementById("news-page-main").innerHTML = "";

    for(let i = 0; i < headers.length; i++)
    {
        let header = JSON.parse(headers[i]);
        writeNewsArticle(indecies[i], header.title);
    }
}

load();