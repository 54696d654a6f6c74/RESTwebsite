import { textInput } from "../templates/elements.js";
const _ = require("lodash");
const Attribute = require("@54696d654a6f6c74/html-injector").Attribute;

// Can be expanded and made more 
// flexible using optional params
export function generateInputs(inputTitls, inputIDs){
    if(Array.isArray(inputIDs) && Array.isArray(inputTitls))
    {
        if(inputIDs.length == inputTitls.length)
        {
            for(let i = 0; i < inputIDs.length; i++)
            {
                let input = createInput(inputTitls[i], inputIDs[i]);
                injectHTML(input, "inputs");
            }
        }
        else throw "Both array lengths must match!";
    }
    else if(!Array.isArray(inputIDs) && !Array.isArray(inputTitls))
        injectHTML(createInput(inputTitls, inputIDs), "inputs");
    else throw "Both inputs must either be arrays or non-arrays!";
}

function createInput(title, id)
{
    let input = _.cloneDeep(textInput);
    input[0].content = title;
    input[1].atribs.push(new Attribute("id", id));

    return input;
}

// Maybe add this to the injector
export function injectHTML(injection, target)
{
    if(Array.isArray(injection))
    {
        for(let i = 0; i < injection.length; i++)
            document.getElementById(target).innerHTML += injection[i].stringify;
    }
    else
    {
        document.getElementById(target).innerHTML += injection.stringify;
    }
}

generateInputs(["Title", "Author", "Content"], ["news-title", "news-author", "news-content"]);