const { Tag, Attribute } = require("@54696d654a6f6c74/html-injector");

export function get_element(text, href, onclick_name = undefined, onclick_value = undefined)
{
    const ele = 
    new Tag("a", [
        new Tag("h2", text, [
            new Attribute("class", "news-main-item"),
        ])
    ], [new Attribute("href", href)]);

    if(onclick_name != undefined && onclick_value != undefined)
        ele.atribs.push(
            new Attribute("onclick", `${onclick_name}(${onclick_value})`)
        );

    return ele;
}