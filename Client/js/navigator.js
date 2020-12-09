let allElements = document.getElementsByName("selection");

for(let i = 0; i < allElements.length; i++)
{
    allElements[i].href = localStorage["operationType"] + "-news.html";
}
