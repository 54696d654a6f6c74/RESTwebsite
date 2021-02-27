const injector = require("@54696d654a6f6c74/html-injector").Injector;

export class Input
{
    constructor(tags)
    {
        this.structure = tags
    }

    display(target)
    {
        if(Array.isArray(this.structure))
        {
            for(let tag of this.structure)
                injector.bindHTML(tag, target)
        }
        else
            injector.bindHTML(this.structure, target);
    }
}