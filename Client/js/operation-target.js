import { writeElements } from "./common.js";

// NOTE: This is the same code as in
// main-select.js maybe generalize this?

const titles = ["Новина", "Контакт"];
const values = ["'news'", "'contact'"];

let target = localStorage["operationType"] + "-" + localStorage["operationTarget"] + ".html";

writeElements("insert-target", titles, "selection", values, target);