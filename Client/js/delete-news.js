import { injectHeaders } from "./common.js";
import { getNewsPart } from "../../Public/js/utils.js";

injectHeaders(getNewsPart("headers"), "insert-target", "selectArticle");
