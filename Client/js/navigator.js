import { generateNav } from "./common.js";

export function writeNav(tars, backButton = true)
{
    document.body.innerHTML = generateNav(tars, backButton).stringify + document.body.innerHTML;
}
