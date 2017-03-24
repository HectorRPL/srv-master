/**
 * Created by Héctor on 09/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Productos} from "../../api/productos/collection";
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

    if (Tiendas.find().count() === 0) {
        var tiendas = JSON.parse(Assets.getText("dbJson/tiendas.json"));
        tiendas.forEach((tienda) => {
            tienda.fechaCreacion = new Date(tienda.fechaCreacion);
            Tiendas.insert(tienda);
        });
    }

    // ESTE CÓDIGO SÓLO ES PARA PRODUCTOS HELVEX
    if (Productos.find({marcaId: 'ExsFjNxan4YEDFxcX'}).count() === 0) {
        let lineasHelvex = [
            'ALBATROS',
            'ANDROS',
            'ANDROS',
            'ANTARES',
            'ANTEA',
            'ANTIQUA',
            'ATICA',
            'ANTICA',
            'CAPRI',
            'CENTURY',
            'CLASICA II',
            'CLASICA',
            'CORINTO',
            'DIAMANTE',
            'ELEGANCE',
            'EXPLORA',
            'FLAIR',
            'FORZA',
            'KONOS',
            'KUBICA',
            'MAGNA',
            'MURANO',
            'NUVA',
            'PIURA',
            'PREMIER',
            'PRIMMA',
            'RIVOLI PLUS',
            'RIVOLI',
            'SQUADRA',
            'TRIPOLI',
            'TRITON',
            'VERTIKA'
        ];
        let tiposProductos = [
            'MANERALES',
            'MONOMANDO',
            'MEZCLADORA',
            'TOALLERO',
            'VASO',
            'PAPEL',
            'CEPILLERO',
            'FLUXOMETRO',
            'TANQUE',
            'WC',
            'LAVABO',
            'JABONERA',
            'REGADERA',
            'ASIENTO',
            'SALIDA DE TINA'
        ];
        var readStream = fs.createReadStream(basePath + "/private/csv/helvex.csv");
        var writeStream = fs.createWriteStream(basePath + "/private/csv/helvex.json");

        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {

            tiposProductos.forEach((tipoProd)=> {
                if (jsonObject.descripcionDos.includes(tipoProd)) {
                    jsonObject.tipoProductoId = tipoProd;
                }
            });

            lineasHelvex.forEach((linea) => {
                if (jsonObject.descripcionDos.includes(linea)) {
                    jsonObject.linea = linea;
                }
            });

            if(jsonObject.INFORMATIVO.includes('DESCON')){
                jsonObject.activo = false;
            } else {
                jsonObject.activo = true;
            }

            let indexGuion = jsonObject.codigoProveedor.lastIndexOf('-');
            let newString = jsonObject.codigoProveedor.substring(indexGuion, jsonObject.codigoProveedor.length);
            newString = newString.replace('P', '').trim();
            if(newString === '-S/L') {
                jsonObject.color = 'SATIN LACA';
            }else if(newString === '-N/D') {
                jsonObject.color = 'NIQUEL DURAVEX';
            }else if(newString === '-S') {
                jsonObject.color = 'SATIN';
            }else{
                jsonObject.color = 'CROMO';
            }

            jsonObject.descripcion = `${jsonObject.codigoProveedor} ${jsonObject.INFORMATIVO} ${jsonObject.linea} ${jsonObject.color}`;
            delete jsonObject.usuarioId;
            delete jsonObject.costoDos;
            delete jsonObject.INFORMATIVO;

            Productos.insert(jsonObject);

        }));

    }


});
