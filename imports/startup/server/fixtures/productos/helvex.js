/**
 * Created by jvltmtz on 29/04/17.
 */
import {Meteor} from "meteor/meteor";
import {Productos} from "../../../../api/catalogos/productos/collection";
import {Factores} from "../../../../api/factores/collection";

// Antigua manera de importar
var path = require('path');
// Obtenemos la ruta base para luego concatenarle lo demás.
var basePath = path.resolve('.').split('.meteor')[0].replace(/\/$/, '');
const csv = require('csvtojson');
var fs = require('fs');

Meteor.startup(function () {

    /*Carga de HELVEX
    if (Productos.find({marcaId: 'NtGCfXgxY9aAAYk37'}).count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/csv/productos/helvex-factores.csv");
        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            //console.log(jsonObject);

            const fact = Factores.findOne({marcaVieja: jsonObject.marca});
            //console.log(fact);
            if (fact) {

                let catProd = {
                    marcaId: fact.marcaId,
                    factorDefaultId: fact._id,
                    codigoProveedor: jsonObject.articulo,
                    campoBusqueda: 'HELVEX ' + jsonObject.articulo + ' ' + jsonObject.tipoP,
                    tipoProductoId: jsonObject.descp2,
                    descontinuado: jsonObject.descontinuado === 1,
                    undidad: jsonObject.unidad,
                    costoProveedor: jsonObject.precio9,
                    activo: jsonObject.bloqueado === 0,
                    descp1: jsonObject.descp1,
                    descp2: jsonObject.descp2,
                    descp3: jsonObject.descp3,
                    descp4: jsonObject.descp4,
                    descp5: jsonObject.descp5,
                    descp6: jsonObject.descp6,
                    descp: jsonObject.descrip,
                };

                let indexGuion = jsonObject.articulo.lastIndexOf('-');
                let newString = jsonObject.articulo.substring(indexGuion, jsonObject.articulo.length);
                if (newString.includes('P')) {
                    catProd.promocion = true;
                }
                newString = newString.replace('P', '').trim();
                if (newString === '-S/L') {
                    catProd.color = 'SATIN LACA';
                }
                if (newString === '-N/D') {
                    catProd.color = 'NIQUEL DURAVEX';
                }
                if (newString === '-S') {
                    catProd.color = 'SATIN';
                } else {
                    catProd.color = 'CROMO';
                }


                Productos.insert(catProd, (err)=> {
                    if (err) {
                        console.log('Error agregar HELVEX ', jsonObject.articulo);
                    }
                })

            }

        }));
    }*/

    if (Productos.find({$and: [{marcaId: 'NtGCfXgxY9aAAYk37'}, {descontinuado: true}]}).count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/csv/productos/helvex-factores.csv");
        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            const selector = {
                $and: [
                    {marcaId: 'NtGCfXgxY9aAAYk37'},
                    {codigoProveedor: jsonObject.articulo}
                ]
            };
            const prod = Productos.findOne(selector);
            if (prod) {
                if (jsonObject.descontinuado === '1') {
                    console.log('Prodcuto descontinuado ', jsonObject.articulo);
                    Productos.update({_id: prod._id}, {
                        $set: {
                            descontinuado: true
                        }
                    });
                }
            } else {
                console.log('Producto no encontrado ', jsonObject.articulo);
            }
        }));
    }

    if (Productos.find({$and: [{marcaId: 'NtGCfXgxY9aAAYk37'}, {activo: true}]}).count() === 0) {
        var readStream = fs.createReadStream(basePath + "/private/csv/productos/helvex-factores.csv");
        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            const selector = {
                $and: [
                    {marcaId: 'NtGCfXgxY9aAAYk37'},
                    {codigoProveedor: jsonObject.articulo}
                ]
            };
            const prod = Productos.findOne(selector);
            if (prod) {
                if (jsonObject.bloqueado === '1') {
                    console.log('Prodcuto bloqueado ', jsonObject.articulo);
                } else {
                    Productos.update({_id: prod._id}, {
                        $set: {
                            activo: true
                        }
                    });
                }

            }
        }));
    }

    /* Este codigo solo fue para normalizar el campo busqueda para helvex

    if (Productos.find({marcaId: 'NtGCfXgxY9aAAYk37'}).count() === 1659) {
        let prods = Productos.find({marcaId: 'NtGCfXgxY9aAAYk37'});
        prods.forEach((prod, index)=> {
            let campoBusq = prod.codigoProveedor + ' ' + prod.tipoProductoId + ' ';
            if (prod.linea) {
                campoBusq += prod.linea + ' ';
            }
            campoBusq += prod.color;

            Productos.update({_id: prod._id}, {$set: {campoBusqueda: campoBusq}}, (err)=> {
                if (err) {
                    console.log('Erro al actualizar ', prod._id, campoBusq);
                }
            });
        });
    }*/

});