import * as utils from './utils.js';

async function getPage()
{
    // A validation step could be done before returning
    return await utils.httpGet(localStorage["selectedPage"]);
}

function displayPageContent(content)
{
    document.getElementById("page-content").innerHTML += 
    `
    <div id="article-content">
        <p> ${content.content} </p>
    </div>
    `
}
async function load(){
    const data = await getPage();
    await getPage().then((content) => displayPageContent(content));
}
load();
