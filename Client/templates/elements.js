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
new Tag("input", "", 
    [
        new Attribute ("type", "text"),
        new Attribute ("class", "text-input")
    ])
];

export const mdInput = 
[
new Tag("h3", "", []),
new Tag("textarea", "", [
    new Attribute ("class", "md-input"),
    new Attribute ("rows", "20"),
]),
new Tag("iframe", "", [
    new Attribute ("class", "md-input"),
    new Attribute ("id", "md-preview"),
    new Attribute ("style", "display: none;")
]),
new Tag("div", [
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("style", "font-weight: bold;"),
        new Attribute("onclick", "insertModifier('bold')"),
        new Attribute("value", "B")
    ]),
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("style", "font-style: italic;"),
        new Attribute("onclick", "insertModifier('italic')"),
        new Attribute("value", "I")
    ]),
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("onclick", "insertModifier('heading')"),
        new Attribute("value", "H")
    ]),
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("onclick", "insertModifier('bulletList')"),
        new Attribute("value", "&colone;")
    ]),
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("onclick", "insertModifier('numberList')"),
        new Attribute("value", "&#8562;")
    ]),
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("style", "font-weight: bold;"),
        new Attribute("onclick", "insertModifier('quote')"),
        new Attribute("value", "&rdquo;")
    ]),
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("style", "font-family: monospace, monospace;"),
        new Attribute("onclick", "insertModifier('codeBlock')"),
        new Attribute("value", ">_")
    ]),
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("style", "font-family: monospace, monospace;"),
        new Attribute("onclick", "insertModifier('hyperlink')"),
        new Attribute("value", "&#9939;")
    ]),
    new Tag("input", "", [
        new Attribute("type", "button"),
        new Attribute("class", "ribbon-button"),
        new Attribute("onclick", "insertModifier('line')"),
        new Attribute("value", "-")
    ])
], [new Attribute ("id", "ribbon")])
];