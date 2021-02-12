import { generateInputs } from "./common.js";
import { httpGet } from "../../Public/js/utils.js";
import { submit } from "./data-submit.js";

const inputData = {
   news: {
        titles: ["Title", "Author", "Content"], 
        inputs: ["text-input", "text-input", "md-input"],
        clickFunc: () => submit("news", "PUT"),
   },
   contacts: {
        titles: ["Name", "Number"], 
        inputs: ["text-input", "text-input"],
        clickFunc: () => submit("contacts", "PUT"),
   }
};

let data = []

async function fillDataNews()
{
    let id = localStorage["updateArticle"];
    let info = await httpGet(localStorage["operationTarget"] + "/" + id + "/header");
    info = JSON.parse(info);

    data.push(info.title);
    data.push(info.author);

    info = await httpGet(localStorage["operationTarget"] + "/" + id + "/md");
    info = JSON.parse(info);

    data.push(info.md);
}

async function fillDataContacts()
{
    let id = localStorage["updateArticle"];
    let info = await httpGet(localStorage["operationTarget"] + "/" + id + "/details");
    info = JSON.parse(info);

    data.push(info.name);
    data.push(info.number);
}

async function load()
{

}

/*
 What I'm trying here is to inject the data after it's
 rendered BUT since I do the rendering elsewhere I have
 no reference to ;the objects I'm rendering so I cannot
 inject into them. This is why this approach won't work

 A complete overhal is necessary for this:
 TO DO steps:
    1 - generateInputs from common.js should not render
 it should only generate the objects and return them
    1++ - maybe turn everything in common.js into funcs
    that don't affect anything and only return things
    2 - turn the news and contacts into classes, this
    way I can set a model for new types of dynamic data
    3 - link  1 and 2 up
    4 - kill yourself
*/

let inputType = inputData[localStorage["operationTarget"]];
console.log(generateInputs(inputType.titles, inputType.inputs, inputType.clickFunc));

load();
