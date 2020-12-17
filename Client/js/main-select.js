import { getNavigationElement } from "../templates/elements.js";
import { generateNav } from "./navigator.js";

const messages = ["Добавяне", "Премахване", "Редактиране"];
const values = ["'add'", "'delete'", "'update'"];

for(let i = 0; i < messages.length; i++)
{
    let navEle = getNavigationElement("operation-target-select.html", "select", values[i], messages[i])
    document.getElementById("main-select-options").innerHTML += navEle.stringify;
}

document.body.innerHTML = generateNav(["main.html"]).stringify + document.body.innerHTML;