import { SelectionMenu } from "./Navigation/MenuSystem/selection-menu.js";

const titles = ["Добавяне", "Премахване", "Редактиране"];
const values = ["'add'", "'delete'", "'update'"];

const menu = new SelectionMenu("insert-target", titles, "target-select.html", "select", values);
menu.render();
