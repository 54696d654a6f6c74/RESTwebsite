import * as utils from './utils.js';

async function load()
{
    let data = await utils.httpGet("news/sorted");
    let indecies = data.indecies;

    if(indecies.length > 0)
    {
        const header = await utils.httpGet("news/" + indecies[indecies.length-1] + "/" + "header");
        const content = await utils.httpGet("news/" + indecies[indecies.length-1] + "/" + "content");

        document.getElementById("article-1").innerHTML += 
        `
        <div id="article-header">
            <h2> ${header.title} </h2>
        </div>
        <div id="article-content">
            <p> ${content.fill} </p>
        </div>
        `
    }

    if(indecies.length > 1)
    {
        const header = await utils.httpGet("news/" + indecies[indecies.length-2] + "/" + "header");
        const content = await utils.httpGet("news/" + indecies[indecies.length-2] + "/" + "content");

        document.getElementById("article-2").innerHTML += 
        `
        <div id="article-header">
            <h2> ${header.title} </h2>
        </div>
        <div id="article-content">
            <p> ${content.fill} </p>
        </div>
        `
    }
}

load();