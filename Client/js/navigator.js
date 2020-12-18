let allElements = document.getElementsByName("selection");

for(let i = 0; i < allElements.length; i++)
{
    allElements[i].href = localStorage["operationType"] + "-news.html";
}

import { blankButton } from "../templates/elements.js";
import { nav } from "../templates/containers.js";
const Attribute = require("@54696d654a6f6c74/html-injector").Attribute;
const _ = require("lodash");

'use strict'
export function generateNav(tars, backButton = true)
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

// There are more elegant ways of doing this
// but as far as my research goes this is the fastest
// document.body.innerHTML = generateNav().stringify + document.body.innerHTML;
