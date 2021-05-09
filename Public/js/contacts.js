import * as utils from './utils.js';

async function getContacts()
{
    // A validation step could be done before returning
    return await utils.httpGet("contacts?all=true");
}

function displayContacts(contacts)
{
    for(let i = 0; i < contacts.length; i++)
    {
        let contact = contacts[i];
        document.getElementById("contacts").innerHTML += "<p> Име: " + contact.name + "</p>";
        document.getElementById("contacts").innerHTML += "<p> Номер: " + contact.number + "</p><hr>";
    }
}

getContacts().then((contacts) => displayContacts(contacts.headers));
