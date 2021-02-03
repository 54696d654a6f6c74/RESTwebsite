import { addRequest } from "./common.js";

const md = require("markdown").markdown;

export function submit(type)
{
    switch(type)
    {
        case 'news':
            submitNews();
        break;
        
        case 'contacts':
            submitContact();
        break;
    }
}

export function submitNews()
{
    const txtData = document.getElementsByClassName("text-input");
    const mdData = document.getElementsByClassName("md-input");

    const header = {
        title: txtData[0].value,
        author: txtData[1].value,
        date: new Date().toLocaleString()
    }

    const md_dat = {
        md: mdData[0].value
    };

    const content = {
        
        fill: md.toHTML(mdData[0].value)
    };

    // This part can be abstracted
    const json = {
        header: header,
        md: md_dat,
        content: content
    }
    addRequest(json);
}

function submitContact()
{
    const data = document.getElementsByClassName("text-input");

    const json = {
        name: data[0].value,
        number: data[1].value
    }

    addRequest(json);
}
