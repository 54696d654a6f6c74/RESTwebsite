import { getNavigationElement } from "../templates/elements.js";

const messages = ["Добавяне", "Премахване", "Редактиране"];
const values = ["'add'", "'delete'", "'update'"];

for(let i = 0; i < messages.length; i++)
{
    let navEle = getNavigationElement("operation-target-select.html", "select", values[i], messages[i])
    document.getElementById("main-select-options").innerHTML += navEle.stringify;
}