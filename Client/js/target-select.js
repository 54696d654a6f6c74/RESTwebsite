import { SelectionMenu } from "./Navigation/MenuSystem/selection-menu.js";
import { getAvailableOperations, getHrefs } from "./DataTypes/mapper.js";

const titles = getAvailableOperations();

let types = [];
for(let i in titles)
    types.push("'" + titles[i].toLowerCase() + "'");

const href = getHrefs();

const menu = new SelectionMenu("insert-target", titles, href, "selection", types);
menu.render();
