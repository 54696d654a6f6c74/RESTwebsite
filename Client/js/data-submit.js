const md = require("markdown").markdown;

export function submit(dataType, request)
{
    switch(dataType)
    {
        case "news":
            submitRequest(request, newsData())
        break;
        case "contacts":
            submitRequest(request, contactData())
        break;
    }
}

function newsData()
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

    return json;
}

function contactData()
{
    const data = document.getElementsByClassName("text-input");

    const contact = {
        name: data[0].value,
        number: data[1].value
    };

    const json = {
        details: contact
    };

    return json;
}

function submitRequest(reqType, data)
{
    fetch("http://127.0.0.1:5000/" + localStorage["operationTarget"], {
        method: reqType,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {console.log("Done, response: " + res)})
}