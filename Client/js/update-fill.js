import { generateInputs } from "./common.js";
import { getNewsPart } from "../../Public/js/utils.js";

let header = []

async function fillHeader()
{
    let id = localStorage["updateArticle"];
    let info = await getNewsPart("header", id);

    header.push(info.title);
    header.push(info.author);

    info = await getNewsPart("content", id);
    header.push(info.md);
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
