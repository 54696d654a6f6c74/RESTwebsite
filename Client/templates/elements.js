const { Tag, Attribute } = require("@54696d654a6f6c74/html-injector");

export const navEle = 
new Tag("a", [
    new Tag("h2", "", [new Attribute("class", "news-main-item")])
], []);

export const blankButton = 
new Tag("a", "", [new Attribute("class", "button")]);

export const textInput =
[
new Tag("h3", "", []),
new Tag("input", "", [new Attribute ("type", "text")])
];

export const mdInput = 
[
new Tag("h3", "", []),
new Tag("textarea", "", [])
];