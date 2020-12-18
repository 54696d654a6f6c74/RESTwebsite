function generateHeader()
{
    let title = document.getElementById("news-title").value;
    let author = document.getElementById("news-author").value;

    // A check for the fields can be done here
    // if the fields are not filled out
    // display an error somehow

    return {
        title: title,
        author: author,
        date: new Date().toLocaleString()
    }
}

function submit()
{
    const header = generateHeader();
    const content = {
        fill: document.getElementById("news-content").value
    };
    const json = {
        header: header,
        content: content
    }
    
    fetch("http://127.0.0.1:5000/news", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    }).then(res => {console.log("Done, response: " + res)})
}
