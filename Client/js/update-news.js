import { httpGet } from "../../Public/js/utils.js";
import { injectHeaders } from "./common.js";
import { headerWriter } from "./delete-news.js";

injectHeaders(httpGet("/" + localStorage["operationTarget"] + "/headers/sorted"), "insert-target", "selectArticle", headerWriter, "update-fill.html");
