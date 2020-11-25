import * as utils from './utils.js';

// Abstract this function away
async function getNewsPart(part, id)
{
    // A validation step could be done before returning
    let ret;
    try{
        ret = await utils.httpGet("news/" + id + "/" + part);
        //throw new Error("Your mom");
    }
    catch(err){ console.log(err.message)}
    return ret;
}

function writeNewsArticle(id, header)
{
    document.getElementById("news-page-main").innerHTML += `
    <a onclick="selected(${id})" href="news-page.html">
        <h2 class="news-main-item">${header}</h2>
    </a>`;
}

let done = false;
let i = 1;

async function load()
{
    let done = false;
    let i = 1;
    
    while(!done)
    {
        console.log(i);

        let headerInfo = await getNewsPart("header", i);
        
        if(headerInfo == null)
            break;

        writeNewsArticle(i, headerInfo.title);
        i++;
    }
}

load();