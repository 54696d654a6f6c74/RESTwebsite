import { generateInputs } from "./common.js";
import { submit } from "./add-submit.js";

const _ = require("lodash");

require("@54696d654a6f6c74/html-injector").Injector.injectHTML;

switch(localStorage["operationTarget"])
{
    case 'news':
        generateInputs(
            ["Title", "Author", "Content"], 
            ["text-input", "text-input", "md-input"], 
            () => submit("news")
        );
    break;
    
    case 'contacts':
        generateInputs(
            ["Names", "Phone number"], 
            ["text-input", "text-input"], 
            () => submit("contacts")
        );
    break;
}
