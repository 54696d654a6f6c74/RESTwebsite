class Data
{
    constructor(name, number)
    {
       this.name = name;
       this.number = number;
    }
}

let data;

async function httpGet()
{
    return fetch("http://127.0.0.1:5000/contacts")
    .then((dat) => {return dat.json();})
    .then((dat) => {data = new Data(dat.name, dat.number)});
}

async function load()
{
    await httpGet();
    
    const ContactDisplay = {
        data(){
            return{
                name: data.name,
                number: data.number
            };
        }
    }
    Vue.createApp(ContactDisplay).mount('#contacts');
}

load();