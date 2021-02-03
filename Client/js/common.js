import * as elements from "../templates/elements.js";
import * as containers from "../templates/containers.js";

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
export function generateInputs(inputTitles, inputClasses, submitFunc, inputContents){
    let classToElementType = {
        "text-input": elements.textInput,
        "md-input": elements.mdInput
    }

    function createInput(title, htmlClass, contnet)
    {
        let input = _.cloneDeep(classToElementType[htmlClass]);
        input[0].content = title;
        input[1].atribs.push(new Attribute("class", htmlClass));

        console.log(contnet);

        if(contnet != undefined)
            input[1].atribs.push(new Attribute("value", contnet));

        return input;
    }

    if(Array.isArray(inputClasses) && Array.isArray(inputTitles))
    {
        if(inputClasses.length == inputTitles.length)
        {
            console.log(inputContents);
            for(let i = 0; i < inputClasses.length; i++)
            {
                // This check is naive!
                let input = inputContents == undefined ? 
                createInput(inputTitles[i], inputClasses[i], undefined) : 
                createInput(inputTitles[i], inputClasses[i], inputContents[i]);

                Injector.injectHTML(input, "inputs");

                // Update the injector so this isn't necessary
                if(document.getElementById("md") != undefined && inputContents[i] != undefined)
                    document.getElementById("md").value = inputContents[i];
            }
        }
        else throw "Both array lengths must match!";
    }
    else if(!Array.isArray(inputIDs) && !Array.isArray(inputTitles) && !Array.isArray(inputElement))
        Injector.injectHTML(createInput(inputTitles, inputIDs, inputContents, inputElement), "inputs");
    else throw "Both arguments must either be arrays or non-arrays!";
    
    // Ensures that the event will be 
    // linked properly and on time
    window.onload = () => {
        document.getElementById("submit").addEventListener("click", submitFunc);
    };
}

export function injectHeaders(data, target, funcName, writer, href)
{
    // I can now add a button for the user to change the sorting.
    // By default sorting is used for most convinience

    document.getElementById(target).innerHTML = "";

    for(let i = 0; i < data.headers.length; i++)
    {   
        let header = JSON.parse(data.headers[i]);

        if(href != undefined)
            writer(header, target, funcName, data.indecies[i], href);
        else writer(header, target, funcName, data.indecies[i]);
    }
}

export function addRequest(json)
{
    fetch("http://127.0.0.1:5000/" + localStorage["operationTarget"], {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    }).then(res => {console.log("Done, response: " + res)})
}