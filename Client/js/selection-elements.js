import { navEle } from "../templates/elements.js";

const Attribute = require("@54696d654a6f6c74/html-injector").Attribute;
const _ = require("lodash");

function generateSelections(title, onclick, value, href)
{
    let ele = _.cloneDeep(navEle);

    ele.content[0].content = title;

    if(onclick != undefined)
        ele.atribs.push(new Attribute("onclick", `${onclick}(${value})`));
    if(href != undefined)
        ele.atribs.push(new Attribute("href", href));

    return ele;
}

export function writeElements(target, titles, onclick, values, hrefs)
{
    if(!Array.isArray(onclick) && !Array.isArray(hrefs))
    for(let i = 0; i < titles.length; i++)
    {
        let ele = generateSelections(titles[i], onclick, values[i], hrefs);
        document.getElementById(target).innerHTML += ele.stringify;
    }
}