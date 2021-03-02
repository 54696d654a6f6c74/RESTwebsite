import { getDataType } from "./DataTypes/mapper.js";

const injector = require("@54696d654a6f6c74/html-injector").Injector;

const request = "PUT";

const inputFieldType = getDataType();

const inputFields = new inputFieldType();
const generatedFields = inputFields.generateInputs(request);

injector.bindHTML(generatedFields, "inputs");

console.log("Called");

inputFields.writeServerData();
