import { generateInputs } from "./common.js";
import { getNewsPart } from "../../Public/js/utils.js";

let header = []

// This does not work properly yet because
// I'm basing the IDs off of the index in a 
// regular array, wihle the real indexi a 
// different value in the filesystem!!!
async function fillHeader()
{
    let id = localStorage["updateArticle"];
    let info = await getNewsPart("header", id);

    header.push(info.title);
    header.push(info.author);

    info = await getNewsPart("content", id);
    header.push(info.fill);
}

async function load()
{
    await fillHeader();
    generateInputs(
    ["Title", "Author", "Content"], 
    ["news-title", "news-author", "news-content"],
    header
    );
}

load();