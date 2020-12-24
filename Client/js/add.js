import { generateInputs } from "./common.js";

const _ = require("lodash");

require("@54696d654a6f6c74/html-injector").Injector.injectHTML;

generateInputs(["Title", "Author", "Content"], ["news-title", "news-author", "news-content"]);
