/**
 * @abstract
 * @classdesc Base class for all Menu types
 */
export class Menu
{
    constructor(inputs, render_target)
    {
        this.inputs = inputs;
        this.render_target = render_target;
    }

    render()
    {
        if(Array.isArray(this.inputs))
        {
            for(let input of this.inputs)
                input.display(this.render_target);
        }
        else
        {
            this.inputs.display(this.render_target);
        }
    }
}
