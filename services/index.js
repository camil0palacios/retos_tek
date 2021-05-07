const url = 'https://www.datos.gov.co/resource/gt2j-8ykr.json';
const fetch = require('node-fetch');
const Contagio = require('../models/Contagio');
const services = {}

// reto 1
services.getData = async () => {
    const data = await fetch(url)
        .then(res => {
            return res.json()
        })
    return data;
}

services.discriminar = data => {
    const newData = {
        "M": {
            "[0-20)": [],
            "[20-40)": [], 
            "[40-mas)": [],
        }, 
        "F": {
            "[0-20)": [],
            "[20-40)": [], 
            "[40-mas)": [],    
        }
    };
    data.map(elem => {
        let rango = "";
        const edad = elem.edad;
        if(0 <= edad && edad < 20) rango = "[0-20)";
        else if(20 <= edad && edad < 40) rango = "[20-40)";
        else rango = "[40-mas)";
        newData[elem.sexo][rango].push(elem);
    });
    return newData;    
}

// reto 2
changeDateFormat = date => {
    date = date.replace(/\//g, "-");
    const x = date.split("-");
    const y = x[2].split(" ");
    const ans = y[0]+"-"+x[1]+"-"+x[0]+" "+y[1]; 
    return ans;
}

services.saveData = async () => {
    const dateFields = [
        "fecha_reporte_web",
        "fecha_de_notificaci_n",
        "fecha_inicio_sintomas",
        "fecha_diagnostico",
        "fecha_recuperado",
    ]
    const data = await services.getData();
    const contagios = await Contagio.findAll({ attributes: ['id_de_caso'] });
    const ids = new Set(contagios.map(elem => elem.id_de_caso));
    const filterData = [];
    data.map(elem => {
        const id = elem.id_de_caso;
        if(ids.has(1*id) == false) {            
            for(let i in dateFields) {
                let date = dateFields[i];
                if(typeof elem[date] != 'undefined') { 
                    elem[date] = changeDateFormat(elem[date]);
                }
            }
            filterData.push(elem);
        }
    });
    if(filterData.length > 0) {
        await Contagio.bulkCreate(filterData);
        console.log("data actualizada");
    } else {
        console.log("No existe data nueva para almacenar");
    }
};

services.filter = async (filter) => {
    const {sexo, estado, ciudad } = filter;
    const _where = {};
    if(sexo) _where.sexo = sexo;
    if(estado) _where.estado = estado;
    if(ciudad) _where.ciudad_municipio_nom = ciudad;
    const contagios = await Contagio.findAll({
        where: _where
    });
    const ids = contagios.map(elem => elem.id_de_caso);
    return ids;
}

module.exports = services;