export async function httpGet(path){
    return fetch("http://127.0.0.1:5000/" + path).catch(err => {console.log(err)})
        .then((dat) => {return dat.json();}).catch(() => {return null;})
        .then((dat) => {return dat;}).catch((err) => {console.log(err)});
}

export async function getNewsPart(part, id)
{
    // A validation step could be done before returning
    if(id != undefined)
        return await httpGet("news/" + id + "/" + part);
    else return await(httpGet("news/" + part));
}