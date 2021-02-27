import { Input } from "./Generic/input.js";
import { get_element } from "./templates/elements/button-element.js";

export class ButtonInput extends Input
{
    constructor(text, href, onclick_name, onclick_value)
    {
        let structure = get_element(text, href, onclick_name, onclick_value);

        super(structure);
    }
}
