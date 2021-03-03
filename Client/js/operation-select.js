import { SelectionMenu } from "./Navigation/MenuSystem/selection-menu.js";

const titles = ["Add", "Delete", "Update"];
const values = ["'add'", "'delete'", "'update'"];

const menu = new SelectionMenu("insert-target", titles, "target-select.html", "select", values);
menu.render();
