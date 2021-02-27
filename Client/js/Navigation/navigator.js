import { blankButton } from "../../templates/elements.js";
import { nav } from "../../templates/containers.js";

const _ = require("lodash");
const Attribute = require("@54696d654a6f6c74/html-injector").Attribute;

function generateNav(tars, backButton = true)
{
    let ids = ["back-button", "forward-button"];
    let chars = ["&lt;", "&gt;"];
    let clientNav = _.cloneDeep(nav);

    if(tars.length == 1)
    {
        let button = _.cloneDeep(blankButton);
        let index = backButton ? 0 : 1;

        button.content = chars[index];
        button.atribs.push(new Attribute("id", ids[index]));
        button.atribs.push(new Attribute("href", tars[0]));

        clientNav.content.push(button);
        return clientNav;
    }

    for(let i = 0; i < tars.length; i++)
    {
        let button = _.cloneDeep(blankButton);
        
        button.content = chars[i];
        button.atribs.push(new Attribute("id", ids[i]));

        if(tars[i])
            button.atribs.push(new Attribute("href", tars[i]));

        clientNav.content.push(button);            
    }
    
    return clientNav;
}

export function writeNav(tars, backButton = true)
{
    document.body.innerHTML = generateNav(tars, backButton).stringify + document.body.innerHTML;
}
