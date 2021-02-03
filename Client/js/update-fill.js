import { generateInputs } from "./common.js";
import { httpGet } from "../../Public/js/utils.js";
import { submitNews } from "./add-submit.js";

let header = []

async function fillHeader()
{
    let id = localStorage["updateArticle"];
    //let info = await getNewsPart("header", id);
    let info = await httpGet(localStorage["operationTarget"] + "/" + id + "/header");
    info = JSON.parse(info);

    header.push(info.title);
    header.push(info.author);

    //info = await getNewsPart("md", id);
    info = await httpGet(localStorage["operationTarget"] + "/" + id + "/md");
    info = JSON.parse(info);

    header.push(info.md);

    console.log(header);
}

async function load()
{
    await fillHeader();
    generateInputs(
    ["Title", "Author", "Content"], 
    ["text-input", "text-input", "md-input"],
    submitNews,
    header
    );
}

load();
