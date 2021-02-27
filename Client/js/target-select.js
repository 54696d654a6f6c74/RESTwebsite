import { SelectionMenu } from "./Navigation/MenuSystem/selection-menu.js";
import { getAvailableTypes, getAvailableTitles, getHrefs } from "./DataTypes/mapper.js";

const titles = getAvailableTitles();
const values = getAvailableTypes();

console.log(titles);
console.log(values);

const href = getHrefs();
console.log(href);

const menu = new SelectionMenu("insert-target", titles, href, "selection", values);
menu.render();
