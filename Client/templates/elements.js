const { Tag, Attribute } = require("@54696d654a6f6c74/html-injector");

export function getNavigationElement(hrefTar = "", onClickFuncName = "", onClickValue = "", message, id = "")
{
    //const href = new Attribute("href", hrefTar);
    //const onclick = new Attribute("onclick", `${onClickFuncName}(${onClickValue})`);

    const template = 
    new Tag("a", [
        new Tag("h2", message, [new Attribute("class", "news-main-item")])
    ], []
    );

    if(hrefTar != "")
        template.atribs.push(new Attribute("href", hrefTar));
    if(onClickFuncName != "")
        template.atribs.push(new Attribute("onclick", `${onClickFuncName}(${onClickValue})`));
    if(id != "")
        template.atribs.push(new Attribute("id", id));

    return template;
}
