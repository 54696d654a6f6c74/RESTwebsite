async function getHeaders()
{
    let headers = await fetch("http://127.0.0.1:5000/news/headers").catch(err => {console.log(err);})
    .then((dat) => {return dat.json();}).catch(err => {console.log(err);})
    .then((dat) => {return dat;}).catch(err => {console.log(err);})

    console.log(headers);

    document.getElementById("news-page-main").innerHTML = "";

    // For some reason they're displayed in a random order

    for(let i = 0; i < headers.length; i++)
    {
        let header = JSON.parse(headers[headers.length - i - 1]);        
        document.getElementById("news-page-main").innerHTML += 
        `
        <a onclick="deleteNewsArticle(${headers.length - i - 1})">
            <h2 class="news-main-item">${header.title}</h2>
        <a>
        `;
    }
}

async function deleteNewsArticle(id)
{
    await fetch("http://127.0.0.1:5000/news/" + id,
    {
        method: "DELETE"
    })
    await getHeaders();
}

getHeaders();