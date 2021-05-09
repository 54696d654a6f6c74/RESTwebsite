import * as utils from './utils.js';

function writeNewsArticle(id, title)
{
    document.getElementById("news-page-main").innerHTML += `
    <a onclick="selected(${id})" href="news-page.html">
        <h2 class="main-item">${title}</h2>
    </a>`;
}

async function load()
{
    let data = await utils.httpGet("news?all=true");
    let headers = data.headers;
    let indecies = data.indecies;

    document.getElementById("news-page-main").innerHTML = "";

    for(let i = 0; i < headers.length; i++)
    {
        let header = headers[i];
        writeNewsArticle(indecies[i], header.title);
    }
}

load();