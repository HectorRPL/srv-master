/**
 * Created by jvltmtz on 26/04/17.
 */
import {Meteor} from "meteor/meteor";
import {Proveedores} from "../../../../api/catalogos/proveedores/collection";
import {DatosFiscales} from "../../../../api/datosFiscales/collection";
import {Marcas} from "../../../../api/catalogos/marcas/collection";
import {Factores} from "../../../../api/factores/collection";
import {MarcasViejas} from "../../../../api/catalogos/marcas/marcasViejas/collection";


// Antigua manera de importar
var path = require('path');
// Obtenemos la ruta base para luego concatenarle lo demás.
var basePath = path.resolve('.').split('.meteor')[0].replace(/\/$/, '');
const csv = require('csvtojson');
var fs = require('fs');

Meteor.startup(function () {

    if (Marcas.find().count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/csv/proveed-marcas.csv");
        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            const fechaCreacionF = new Date(jsonObject.fechaCreacion);
            Marcas.insert({nombre: jsonObject.marca, fechaCreacion: fechaCreacionF}, (err)=> {
                if (err) {
                    console.log('No se puedo crear la marca ', jsonObject.marca, err.message)
                }
            });
        }));

    }

    if (MarcasViejas.find().count() === 0) {

        var readStream = fs.createReadStream(basePath + "/private/csv/proveed-marcas.csv");
        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            const marca = Marcas.findOne({nombre: jsonObject.marca});
            if (marca) {
                MarcasViejas.insert({_id: jsonObject.marcaVieja, marcaId: marca._id});
            } else {
                console.log('Marca Vieja no encontrada ', jsonObject.marca);
            }
        }));

    }

    if (Proveedores.find().count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/csv/proveed-marcas.csv");

        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {

            const fechaCreacionF = new Date(jsonObject.fechaCreacion);
            Proveedores.insert({
                nombre: jsonObject.razonSocial,
                email: jsonObject.email || 'default@mail.com',
                cuentaContable: jsonObject.cuentaContable,
                fechaCreacion: fechaCreacionF,
                dias: Number.parseInt(jsonObject.dias)
            }, (err)=> {
                if (err) {
                    console.log('Proveedor no registrado ', jsonObject.noProveedor, err.message);
                }
            });
        }));

    }

    if (DatosFiscales.find().count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/csv/proveed-marcas.csv");

        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {

            const fechaCreacionF = new Date(jsonObject.fechaCreacion);
            if (jsonObject.rfc) {
                const p = Proveedores.findOne({cuentaContable: jsonObject.cuentaContable});
                if (p) {
                    let char = jsonObject.rfc.charAt(3);
                    var tipoPersona = Number.isInteger(Number.parseInt(char)) ? 'PM' : 'PF';

                    let datosFiscales = {
                        rfc: jsonObject.rfc,
                        propietarioId: p._id,
                        calle: jsonObject.calle.replace('.', ' '),
                        delMpio: jsonObject.delMpio,
                        estado: jsonObject.estado.includes('DF') ? 'CIUDAD DE MEXICO' : jsonObject.estado,
                        estadoId: jsonObject.estadoId,
                        colonia: jsonObject.colonia,
                        numExt: jsonObject.numExt.replace('. ', ' '),
                        codigoPostal: jsonObject.codigoPostal.length === 4 ? '0' + jsonObject.codigoPostal : jsonObject.codigoPostal,
                        tipoPersona: tipoPersona,
                        email: 'default@mail.com',
                        fechaCreacion: fechaCreacionF,
                        codigoPais: jsonObject.paisId
                    };

                    if (tipoPersona === 'PM') {
                        datosFiscales.razonSocial = jsonObject.razonSocial;
                    } else {
                        let nombreCmp = jsonObject.razonSocial.split(' ');
                        if (nombreCmp.length === 3) {
                            datosFiscales.nombre = nombreCmp[0];
                            datosFiscales.apellidoPaterno = nombreCmp[1];
                            datosFiscales.apellidoMaterno = nombreCmp[2];
                        } else if (nombreCmp.length === 4)



                        {
                            datosFiscales.nombre = nombreCmp[0] + ' ' + nombreCmp[1];
                            datosFiscales.apellidoPaterno = nombreCmp[2];
                            datosFiscales.apellidoMaterno = nombreCmp[3];
                        } else if (nombreCmp.length === 5) {
                            datosFiscales.nombre = nombreCmp[0] + ' ' + nombreCmp[1] + ' ' + nombreCmp[2];
                            datosFiscales.apellidoPaterno = nombreCmp[3];
                            datosFiscales.apellidoMaterno = nombreCmp[4];
                        }
                    }


                    DatosFiscales.insert(datosFiscales, (err)=> {
                        if (err) {
                            console.log("Erro Fiscales ", jsonObject.noProveedor, p._id, err.message);
                        }
                    });
                }

            } else {
                console.log('Proveedor sin RFC ', jsonObject.noProveedor);
            }


        }));
    }


    if (Factores.find().count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/csv/factores.csv");
        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            const mVieja = MarcasViejas.findOne({_id: jsonObject.marcaVieja});
            if (mVieja) {
                jsonObject.marcaId =  mVieja.marcaId;
                Factores.insert(jsonObject, (err)=>{
                    if(err){
                        console.log('Error al insertar factor ', jsonObject.marcaVieja, err.message);
                    }
                });
            }else{
                console.log('Marca Vieja no encontrada ', jsonObject.marcaVieja);
            }
        }));

    }


});