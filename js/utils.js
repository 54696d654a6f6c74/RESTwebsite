export async function httpGet(path){
    return fetch("http://127.0.0.1:5000/" + path)
        .then((dat) => {return dat.json();})
        .then((dat) => {return dat;});
}