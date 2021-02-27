import { ActionMenu } from "./Navigation/MenuSystem/action-menu.js";

console.log(localStorage["operationTarget"]);
ActionMenu.load_and_render("insert-target", "update-fill.html", "selectArticle");
