import { SelectionMenu } from "./Navigation/MenuSystem/selection-menu.js";
import { getAvailableTypes, getHrefs } from "./DataTypes/mapper.js";

// The function returns string representations
// of the types so it's ok to use them as titles
const titles = getAvailableTypes();

let types = [];
for(let i in titles)
    types.push("'" + titles[i].toLowerCase() + "'");

const href = getHrefs();

const menu = new SelectionMenu("insert-target", titles, href, "selection", types);
menu.render();
