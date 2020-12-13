import { getNavigationElement } from "../templates/elements.js";

let options = [];
const names = ["Добавяне", "Премахване", "Редактиране"];
const values = ["add", "delete", "update"];

for(let i = 0; i < names.length; i++)
{
    let poop = getNavigationElement("operation-target-select.html", "select", values[i], names[i])
    // options.push(getNavigationElement("operation-target-select.html", "select", values[i], names[i]))
    console.log(poop.stringify);
    document.getElementById("main-select-options").innerHTML += poop.stringify;
}

//document.getElementById("main-select-options").innerHTML += poop;