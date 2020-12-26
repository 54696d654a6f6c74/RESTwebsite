import { getNewsPart } from "../../Public/js/utils.js";
import { injectHeaders } from "./common.js";

injectHeaders(getNewsPart("headers"), "insert-target", "selectArticle", "update-news-fill.html");
