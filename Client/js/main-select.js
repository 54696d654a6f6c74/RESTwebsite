import { navEle } from "../templates/elements.js";
import { generateNav } from "./navigator.js";
import { writeElements } from "./selection-elements.js";

const titles = ["Добавяне", "Премахване", "Редактиране"];
const values = ["'add'", "'delete'", "'update'"];

document.body.innerHTML = generateNav(["main.html"]).stringify + document.body.innerHTML;

writeElements("main-select-options", titles, "select", values, "operation-target-select.html");