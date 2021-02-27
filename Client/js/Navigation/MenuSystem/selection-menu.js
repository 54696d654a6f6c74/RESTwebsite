import { Menu } from "./Generic/menu.js";
import { ButtonInput } from "./button-input.js";

export class SelectionMenu extends Menu
{
    constructor(render_target, texts, href, onclick_name = undefined, onclick_values = undefined)
    {
        let buttons = []

        if(Array.isArray(texts))
        {
            if(Array.isArray(href))
            {
                for(let i in texts)
                {
                    if(onclick_name != undefined && Array.isArray(onclick_values))
                        buttons.push(new ButtonInput(texts[i], href[i], onclick_name, onclick_values[i]));
                    else buttons.push(new ButtonInput(texts[i], href[i]));
                }
            }
            else
            {
                for(let i in texts)
                {
                    if(onclick_name != undefined && Array.isArray(onclick_values))
                        buttons.push(new ButtonInput(texts[i], href, onclick_name, onclick_values[i]));
                    else buttons.push(new ButtonInput(texts[i], href));
                }
            }
        }
        else
        {
            if(onclick_name != undefined && onclick_values != undefined)
                buttons.push(new ButtonInput(texts[i], href, onclick_name, onclick_values));
            else buttons.push(new ButtonInput(texts[i], href));
        }

        super(buttons, render_target);
    }
}
