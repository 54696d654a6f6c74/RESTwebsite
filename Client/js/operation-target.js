import { writeElements } from "./common.js";

// NOTE: This is the same code as in
// main-select.js maybe generalize this?

const titles = ["Новина", "Контакт"];
const values = ["'news'", "'contacts'"];

writeElements("insert-target", titles, "selection", values, localStorage["operationType"] + ".html");