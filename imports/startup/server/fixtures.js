/**
 * Created by Héctor on 09/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Productos} from "../../api/productos/collection";
import {Proveedores} from "../../api/catalogos/proveedores/collection";
import {MarcasProveedores} from "../../api/catalogos/marcasProveedores/collection";
import {DatosFiscalesProveedores} from "../../api/catalogos/proveedores/datosFiscales/collection";
import {Marcas} from "../../api/catalogos/marcas/collection";
import {Tiendas} from "../../api/catalogos/tiendas/collection";

// Antigua manera de importar
var path = require('path');
// Obtenemos la ruta base para luego concatenarle lo demás.
var basePath = path.resolve('.').split('.meteor')[0].replace(/\/$/, '');
const csv = require('csvtojson');
var fs = require('fs');

Meteor.startup(function () {

    if (Marcas.find().count() === 0) {
        var marcas = JSON.parse(Assets.getText("dbJson/marcas.json"));
        marcas.forEach((marca) => {
            let marcaTemp = {
                descripcion: marca.descripcion,
                fechaCreacion: new Date(marca.fechaCreacion),
                usuarioId: marca.usuarioId,
                proveedorId: marca.proveedorId
            };
            Marcas.insert(marca);
        });
    }

    /*if (Tiendas.find().count() === 0) {
     var tiendas = JSON.parse(Assets.getText("dbJson/tiendas.json"));
     tiendas.forEach((tienda) => {
     tienda.fechaCreacion = new Date(tienda.fechaCreacion);
     Tiendas.insert(tienda);
     });
     }*/

    // ESTE CÓDIGO SÓLO ES PARA PRODUCTOS HELVEX
    if (Productos.find({marcaId: 'ExsFjNxan4YEDFxcX'}).count() === 0) {

        var readStream = fs.createReadStream(basePath + "/private/csv/helvex.csv");

        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {


            if (jsonObject.descontinuado.includes('DESCON')) {
                jsonObject.descontinuado = true;
            } else {
                jsonObject.descontinuado = false;
            }

            let indexGuion = jsonObject.codigoProveedor.lastIndexOf('-');
            let newString = jsonObject.codigoProveedor.substring(indexGuion, jsonObject.codigoProveedor.length);
            newString = newString.replace('P', '').trim();
            if (newString === '-S/L') {
                jsonObject.color = 'SATIN LACA';
            } else if (newString === '-N/D') {
                jsonObject.color = 'NIQUEL DURAVEX';
            } else if (newString === '-S') {
                jsonObject.color = 'SATIN';
            } else {
                jsonObject.color = 'CROMO';
            }

            if (jsonObject.descripcionDos.includes('MANERALES')) {
                jsonObject.unidad = 'JGO';
            } else if (jsonObject.descripcionDos.includes('KIT')) {
                jsonObject.unidad = 'PQT'
            }
            const marca = Marcas.findOne({_id: 'ExsFjNxan4YEDFxcX'});
            jsonObject.marcaId = 'ExsFjNxan4YEDFxcX';

            jsonObject.campoBusqueda = `${jsonObject.nombre} ${jsonObject.codigoProveedor} ${jsonObject.tipoProductoId} ${jsonObject.linea}`;

            Productos.insert(jsonObject);

        }));

    }

    if (Productos.find({marcaId: '5a4KBNeJ2RafzjBxi'}).count() === 0) {

        var readStream = fs.createReadStream(basePath + "/private/csv/daltile.csv");

        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {

            jsonObject.unidad = 'CJA';

            if (jsonObject.infoUno != undefined && jsonObject.infoUno.length > 0) {
                jsonObject.rectificado = jsonObject.infoUno.includes('RECTIFICADO') ? true : false;
            }
            if (jsonObject.descripcionDos.includes('PROMOCION')) {
                jsonObject.calidad = 2;
            }

            const marca = Marcas.findOne({_id: '5a4KBNeJ2RafzjBxi'});
            jsonObject.marcaId = '5a4KBNeJ2RafzjBxi';

            jsonObject.campoBusqueda = `${marca.nombre} ${jsonObject.nombre} ${jsonObject.color}`;
            delete jsonObject.infoUno;
            delete jsonObject.infoDos;
            delete jsonObject.marcaAbrev;

            //console.log(jsonObject);
            Productos.insert(jsonObject);

        }));

    }

    console.log(Proveedores.find().count());
    if (Proveedores.find().count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/csv/proveedores.csv");

        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            if (jsonObject.NOMBRE) {

                let proveedorObjt = {
                    nombre: jsonObject.NOMBRE,
                    saldo: jsonObject.SALDO,
                    diasCredito: jsonObject.DIAS,
                    descuento: jsonObject.DESC1,
                    cuentaContable: jsonObject.URL,
                    telefonos: jsonObject.TELEFONO ? jsonObject.TELEFONO.split(' ') : [],
                    fechaCreacion: jsonObject.USUFECHA + ' ' + jsonObject.USUHORA
                };

                Proveedores.insert(proveedorObjt, (err, id)=> {
                    if (err) {
                        console.log('Erro isnertar proveedor ', err);
                    } else {

                        marcasIds = Marcas.find({proveedorId: jsonObject.PROVEEDOR}, {fields: {_id: 1}}).fetch();
                        marcasIds.forEach((marcaId)=> {
                            MarcasProveedores.insert({proveedorId: id, marcaId: marcaId._id});
                        });

                        let calleTemp = '';
                        let noInt = '';
                        let delTemp = '';
                        let estadoTemp = '';
                        let estadoIdTemp = '';
                        let paisCodigo = '';
                        let noIntTemp = '';
                        var datosFiscalesProv = {};

                        if (jsonObject.CALLE) {
                            calleTemp = jsonObject.CALLE.toUpperCase();
                            let palabras = calleTemp.split(' ');
                            calleTemp = '';
                            palabras.forEach((palabra)=> {
                                if (palabra.includes('NO')) {
                                    noIntTemp = palabra.substring(2, palabra.length);
                                } else {
                                    calleTemp += palabra + ' ';
                                }
                            });

                            if (jsonObject.ESTADO) {
                                if (jsonObject.ESTADO.includes('DF')) {
                                    estadoTemp = 'CIUDAD DE MEXICO';
                                    estadoIdTemp = 'CMX';
                                    paisCodigo = 'MX';
                                }
                            }

                            if (jsonObject.RFC) {
                                datosFiscalesProv = {
                                    razonSocial: jsonObject.NOMBRE,
                                    rfc: jsonObject.RFC,
                                    calle: calleTemp,
                                    colonia: jsonObject.COLONIA,
                                    delMpio: delTemp.trim(),
                                    numExt: noIntTemp,
                                    estado: estadoTemp,
                                    estadoId: estadoIdTemp,
                                    codigoPostal: jsonObject.CP.length === 4 ? '0' + jsonObject.CP : jsonObject.CP,
                                    curp: jsonObject.curb,
                                    codigoPais: paisCodigo
                                };

                                if (jsonObject.curb) {
                                    datosFiscalesProv.personaFisica = true;
                                }
                            }

                        }
                        if (datosFiscalesProv) {
                            datosFiscalesProv.proveedorId = id;
                            DatosFiscalesProveedores.insert(datosFiscalesProv);
                        }
                    }

                });
            }


        }));
    }


});
