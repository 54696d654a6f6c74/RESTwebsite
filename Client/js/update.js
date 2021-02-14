import { injectHeaders } from "./common.js";
import { httpGet } from "../../Public/js/utils.js";
import { headerWriter } from "./delete.js"

async function load()
{
    let data = await httpGet(localStorage["operationTarget"] + "/sorted");
    injectHeaders(data, "insert-target", "selectArticle", headerWriter, "update-fill.html");
}

load();