import * as utils from './utils.js';

async function getNews()
{
    // A validation step could be done before returning
    return await utils.httpGet("news/" + localStorage["selectedNews"]);
}

function displayNewsArticle(content)
{
    document.getElementById("news-content").innerHTML += "<h2>" + content.title + "</h2>";    
    document.getElementById("news-content").innerHTML += "<p>" + content.fill + "</p>";    
}

getNews().then((content) => displayNewsArticle(content));