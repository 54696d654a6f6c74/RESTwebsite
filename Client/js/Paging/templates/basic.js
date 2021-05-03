const Tag = require("@54696d654a6f6c74/html-injector").Tag;
const Attrib = require("@54696d654a6f6c74/html-injector").Attribute;

export default function getTemplate(num, func, selected = false)
{
    let template = new Tag(
        "button", `${num}`, [
            new Attrib("value", num),
            new Attrib("onclick", func)
        ]
    );

    if (selected)
        template.atribs.push(new Attrib("class", "selected"));

    return template;
}
