const { Tag, Attribute } = require("@54696d654a6f6c74/html-injector");

export function getNavigationElement(hrefTar, onClickFuncName, onClickValue, message)
{
    const href = new Attribute("href", hrefTar);
    const onclick = new Attribute("onclick", `${onClickFuncName}(${onClickValue})`);

    const template = 
    new Tag("a", [
        new Tag("h2", message, [new Attribute("class", "news-main-item")])
    ], 
    [href, onclick]
    );

    return template;
}
