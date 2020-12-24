import { writeElements } from "./common.js";

const titles = ["Добавяне", "Премахване", "Редактиране"];
const values = ["'add'", "'delete'", "'update'"];

writeElements("main-select-options", titles, "select", values, "operation-target-select.html");
