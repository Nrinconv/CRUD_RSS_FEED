const connection = require('../database/db');

exports.saveMunicipio = (req, res)=>{
    const inputNameMunicipio = req.body.inputNameMunicipio;
    connection.query('INSERT INTO municipio SET ?', {nombre_municipio:inputNameMunicipio}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/municipio')
        }
    });
}

exports.updateMunicipio = (req, res)=>{
    const idMunicipio = req.body.idMunicipio;
    const inputNameMunicipio = req.body.inputNameMunicipio;
    connection.query('UPDATE municipio SET ? WHERE idMunicipio = ?', [{nombre_municipio:inputNameMunicipio}, idMunicipio], (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/municipio')
        }
    });
}

exports.saveVivienda = (req, res)=>{
    const inputAddress = req.body.inputAddress;
    const id_municipio = req.body.id_municipio;
    const id_propietario = req.body.id_propietario;
    connection.query('INSERT INTO vivienda SET ?', {direccion:inputAddress, Municipio_idMunicipio:id_municipio, id_propietario:id_propietario}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/vivienda')
        }
    });
}

exports.updateVivienda = (req, res)=>{
    const idVivienda = req.body.idVivienda;
    const inputAddress = req.body.inputAddress;
    const id_municipio = req.body.id_municipio;
    const id_propietario = req.body.id_propietario;
    connection.query('UPDATE vivienda SET ? WHERE idVivienda = ?', [{direccion:inputAddress, Municipio_idMunicipio:id_municipio, id_propietario:id_propietario}, idVivienda], (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/vivienda')
        }
    });
}

exports.savePersona = (req, res)=>{
    const inputName = req.body.inputName;
    const cabeza_familiar = req.body.cabeza_familiar;
    const dependencia = req.body.dependencia;
    const id_municipio = req.body.id_municipio;
    const id_vivienda = req.body.id_vivienda;

    connection.query('INSERT INTO persona SET ?', {nombre_persona:inputName, cabeza_familiar:cabeza_familiar, dependencia:dependencia, Municipio_idMunicipio:id_municipio, propietario:1, Vivienda_id_vivienda:id_vivienda}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/persona')
        }
    });
}

exports.updatePersona = (req, res)=>{
    const idPersona = req.body.idPersona;
    const inputName = req.body.inputName;
    const cabeza_familiar = req.body.cabeza_familiar;
    const dependencia = req.body.dependencia;
    const id_municipio = req.body.id_municipio;
    const id_vivienda = req.body.id_vivienda;

    console.log(dependencia)

    connection.query('UPDATE persona SET ? WHERE idPersona = ?', [{nombre_persona:inputName, cabeza_familiar:cabeza_familiar, dependencia:dependencia, Municipio_idMunicipio:id_municipio, Vivienda_id_vivienda:id_vivienda}, idPersona], (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/persona')
        }
    });
}