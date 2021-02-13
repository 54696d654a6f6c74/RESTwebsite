import { injectHeaders, writeElements } from "./common.js";
import { httpGet } from "../../Public/js/utils.js";

// This should not be here?
export function headerWriter(header, target, funcName, val, href)
{
    function write(title)
    {
        if(href != null)
            writeElements(target, title, funcName, val, href)
        else writeElements(target, title, funcName, val)
    }

    switch(localStorage["operationTarget"])
    {
        case 'news':
            write(header.title);
        break;
        case 'contacts':
            write(header.name);
        break;
    }
}

async function load()
{
    let data = await httpGet(localStorage["operationTarget"] + "/sorted");
    console.log(data);
    injectHeaders(data, "insert-target", "selectArticle", headerWriter)
}

load();