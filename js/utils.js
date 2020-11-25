export async function httpGet(path){
    /*
    let response = fetch("http://127.0.0.1:5000/" + path)

    response.then((dat) => {
        if(dat.ok)
            response = dat.json().then((dat) => { return dat} );
        else return null;//throw new Error("Request failed");
    })
    then((dat) => {return dat;})*/
    return fetch("http://127.0.0.1:5000/" + path)
        .then((dat) => {return dat.json();})
        .then((dat) => {return dat;});
}