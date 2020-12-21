import { generateNav } from "./navigator.js";
import { writeElements } from "./selection-elements.js";

// NOTE: This is the same code as in
// main-select.js maybe generalize this?

const titles = ["Новина", "Контакт"];
const values = ["'news'", "'contact'"];

let target = localStorage["operationType"] + "-" + localStorage["operationTarget"] + ".html";
console.log(target);

document.body.innerHTML = generateNav(["main-select.html"]).stringify + document.body.innerHTML;

writeElements("insert-target", titles, "selection", values, target);