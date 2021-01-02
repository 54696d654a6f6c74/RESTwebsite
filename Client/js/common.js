import * as elements from "../templates/elements.js";
import * as containers from "../templates/containers.js";
import * as utils from "../../Public/js/utils.js";

const { Tag, Attribute, Injector} = require("@54696d654a6f6c74/html-injector");
const _ = require("lodash");

export function writeElements(target, titles, onclick, values, hrefs)
{
    function generateSelections(title, onclick, value, href)
    {
        let ele = _.cloneDeep(elements.navEle);

        ele.content[0].content = title;

        if(onclick != undefined)
            ele.atribs.push(new Attribute("onclick", `${onclick}(${value})`));
        if(href != undefined)
            ele.atribs.push(new Attribute("href", href));

        return ele;
    }

    if(!Array.isArray(onclick) && !Array.isArray(hrefs))
    {
        if(Array.isArray(titles))
        {
            for(let i = 0; i < titles.length; i++)
            {
            let ele = generateSelections(titles[i], onclick, values[i], hrefs);
            Injector.injectHTML(ele, target);
            }
        }
        else
        {
            let ele = generateSelections(titles, onclick, values, hrefs);
            Injector.injectHTML(ele, target);
        }
    }
}

export function generateNav(tars, backButton = true)
{
    let ids = ["back-button", "forward-button"];
    let chars = ["&lt;", "&gt;"];
    let clientNav = _.cloneDeep(containers.nav);

    if(tars.length == 1)
    {
        let button = _.cloneDeep(elements.blankButton);
        let index = backButton ? 0 : 1;

        button.content = chars[index];
        button.atribs.push(new Attribute("id", ids[index]));
        button.atribs.push(new Attribute("href", tars[0]));

        clientNav.content.push(button);
        return clientNav;
    }

    for(let i = 0; i < tars.length; i++)
    {
        let button = _.cloneDeep(elements.blankButton);
        
        button.content = chars[i];
        button.atribs.push(new Attribute("id", ids[i]));

        if(tars[i])
            button.atribs.push(new Attribute("href", tars[i]));

        clientNav.content.push(button);            
    }
    
    return clientNav;
}

// This could be refactored further
export function generateInputs(inputTitles, inputIDs, inputContents, inputElement = elements.textInput){
    function createInput(title, id, contnet, element)
    {
        let input = _.cloneDeep(element);
        input[0].content = title;
        input[1].atribs.push(new Attribute("id", id));
        if(contnet != undefined)
            input[1].atribs.push(new Attribute("value", contnet));

        return input;
    }

    if(Array.isArray(inputIDs) && Array.isArray(inputTitles))
    {
        if(inputIDs.length == inputTitles.length)
        {
            for(let i = 0; i < inputIDs.length; i++)
            {
                // This check is naive!
                let input = Array.isArray(inputElement[0])
                ? createInput(inputTitles[i], inputIDs[i], inputContents == undefined ? undefined : inputContents[i], inputElement[i]) : 
                createInput(inputTitles[i], inputIDs[i], inputContents == undefined ? undefined : inputContents[i], inputElement);

                Injector.injectHTML(input, "inputs");
            }
        }
        else throw "Both array lengths must match!";
    }
    else if(!Array.isArray(inputIDs) && !Array.isArray(inputTitles) && !Array.isArray(inputElement))
        Injector.injectHTML(createInput(inputTitles, inputIDs, inputContents, inputElement), "inputs");
    else throw "Both arguments must either be arrays or non-arrays!";
}

export async function injectHeaders(headers, target, funcName, href)
{
    // I can now add a button for the user to change the sorting.
    // By default no sorting is used for best performance
    headers = await headers;
    let indecies = await utils.getNewsPart("indecies");

    document.getElementById(target).innerHTML = "";

    for(let i = 0; i < headers.length; i++)
    {   
        let header = JSON.parse(headers[i]);
        if(href != undefined)
            writeElements(target, header.title, funcName, indecies[i], href);       
        else writeElements(target, header.title, funcName, indecies[i]);       
    }
}