import { getDataType } from "./DataTypes/mapper.js";

const injector = require("@54696d654a6f6c74/html-injector").Injector;

const request = "POST";

let inputFields = getDataType();
inputFields = inputFields.generateInputs(request);

injector.bindHTML(inputFields, "inputs");
