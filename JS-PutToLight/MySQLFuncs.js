"use strict";
const mysql = require("mysql2");

const PoolCon = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "ptldb",
});

async function QueryIn(string, values) {
    return await new Promise((respuesta, fallo) => {
        PoolCon.query(string, values, (err, res) => {
            if (err) fallo(err);
            respuesta(res);
        });
    });
}

async function Reg(usuario, contra) {
    let strconsulta = "INSERT INTO usuario (Usuario, Pass) VALUES (?, ?)";
    let promesa = await QueryIn(strconsulta, [usuario, contra]);
    console.log("Query sent at: ", Date(Date.now()));
    console.log(promesa);
    if (promesa instanceof Error) return promesa.ToString();
    //promesa (en caso de error) es un objeto, y quiero que me devuelva un string
    else return true;
}

async function Logearse(usuario, contra) {
    let strconsulta = "SELECT usuario FROM Usuario WHERE usuario = ? AND Pass = ?";
    let promesa = await QueryIn(strconsulta, [usuario, contra]);
    console.log("Query sent at: ", Date(Date.now()));
    if (promesa instanceof Error) return promesa.ToString();
    return promesa;
}

/*
async function GetProd(nombre) {
    let strconsulta = "SELECT id FROM prods WHERE ProdNom = ?";
    let promesa = await QueryIn(strconsulta, [nombre]);
    console.log("Query sent at: ", Date(Date.now()));
    if (promesa instanceof Error) return promesa.ToString();
    else return promesa;
}
*/

async function AddProd(nombre) {
    let secuela = "SELECT * FROM prods WHERE ProdNom = ?"
    let promise = await QueryIn(secuela, [nombre]);

    if (promise.length === 0) {
        let strconsulta = "INSERT INTO prods (ProdNom) VALUES (?)";
        let promesa = await QueryIn(strconsulta, [nombre]);
        console.log("Query sent at: ", Date(Date.now()));
        if (promesa instanceof Error) return promesa.ToString();
        console.log("Product ", nombre, " added successfully");
        return true;
    } else return false;
}

async function PutProd(nombre) {
    let strconsulta = "SELECT id FROM prods WHERE ProdNom = ?";
    let promesa = await QueryIn(strconsulta, nombre);
    if (promesa instanceof Error) return promesa.ToString();

    let strconsulta2 = "UPDATE Espacio SET CantProd+1 WHERE id_Prods = ?";
    let promesa2 = await QueryIn(strconsulta2, promesa);
    console.log("Query sent at: ", Date(Date.now()));
    if (promesa2 instanceof Error) return promesa2.ToString();
    console.log("Query completed at: ", Date(Date.now()));
    console.log("Product ", nombre, " amount updated successfully");
    return ("ola");
}

async function RemProd(nombre) {
    let strconsulta = "SELECT id FROM prods WHERE ProdNom = ?";
    let promesa = await QueryIn(strconsulta, nombre);
    if (promesa instanceof Error) return promesa.ToString();

    let strconsulta2 = "UPDATE Espacio SET CantProd-1 WHERE id = ?";
    let promesa2 = await QueryIn(strconsulta2, promesa);
    console.log("Queries sent at: ", Date(Date.now()));
    if (promesa2 instanceof Error) return promesa2.ToString();
    console.log("Product ", nombre, " removed successfully");
    return true;
}

//module.export exporta las funciones para usarlas en la api
module.exports = { Reg, Logearse, AddProd, PutProd, RemProd };