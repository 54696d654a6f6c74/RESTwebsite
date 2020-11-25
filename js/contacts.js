import * as utils from './utils.js';

async function getContacts()
{
    // A validation step could be done before returning
    return await utils.httpGet("contacts");
}

function displayContacts(contacts)
{
    console.log(contacts);
    for(let i = 0; i < contacts.length; i++)
    {
        document.getElementById("contacts").innerHTML += "<p> Име: " + contacts[i].name + "</p>";
        document.getElementById("contacts").innerHTML += "<p> Номер: " + contacts[i].number + "</p><hr>";
    }
}

getContacts().then((contacts) => displayContacts(contacts));
