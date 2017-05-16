/**
 * Created by jvltmtz on 3/05/17.
 */

import {Meteor} from "meteor/meteor";
import {Productos} from "../../../../api/catalogos/productos/collection";
import {Marcas} from "../../../../api/catalogos/marcas/collection";
import {MarcasViejas} from "../../../../api/catalogos/marcas/marcasViejas/collection";
import {Factores} from "../../../../api/factores/collection";

// Antigua manera de importar
var path = require('path');
// Obtenemos la ruta base para luego concatenarle lo demás.
var basePath = path.resolve('.').split('.meteor')[0].replace(/\/$/, '');
const csv = require('csvtojson');
var fs = require('fs');


Meteor.startup(function () {
    const marca = Marcas.findOne({nombre:'DALTILE'});
    if (marca) {
        if (Productos.find({marcaId: marca._id}).count() === 0) {
            var readStream = fs.createReadStream(basePath + "/private/csv/productos/daltile-factores.csv");
            csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
                const marcaVieja = MarcasViejas.findOne({$and: [{_id: jsonObject.marca}, {marcaId: marca._id}]});
                if (marcaVieja) {
                    const fact = Factores.findOne({marcaVieja: jsonObject.marca});
                    if (fact) {
                        let catProd = {
                            marcaId: marca._id,
                            factorDefaultId: fact._id,
                            codigoProveedor: jsonObject.articulo,
                            descontinuado: jsonObject.descontinuado === '1',
                            undidad: jsonObject.unidad,
                            costoProveedor: jsonObject.precio9,
                            activo: jsonObject.bloqueado === '0',
                            medidas: jsonObject.medidas.split('X'),
                            metrosCaja: parseFloat(jsonObject.metrosCaja),
                            calidad: jsonObject.calidad === '1' ? 1 : 2,
                            descp1: jsonObject.descp1,
                            descp2: jsonObject.descp2,
                            descp3: jsonObject.descp3,
                            tipoProductoId: 'RECUBRIMIENTO'
                        };
                        if(jsonObject.descp3){
                            catProd.nombre = jsonObject.descp1 + ' ' + jsonObject.descp2 + ' ' + jsonObject.descp3;
                        }else{
                            catProd.nombre = jsonObject.descp1 + ' ' + jsonObject.descp2;
                        }
                        catProd.campoBusqueda = catProd.nombre + ' ' + jsonObject.medidas;

                        if ( catProd.calidad != 1){
                         catProd.campoBusqueda += ' PROMO';
                        }
                        if(jsonObject.rectificado != '0'){
                            catProd.rectificado = true;
                            catProd.nombre +=  ' RECT';
                        }
                        Productos.insert(catProd, (err)=>{
                            if(err){
                                console.log('Erro inserta produto DALTILE ', catProd.codigoProveedor, err);
                            }
                        });

                    } else {
                        console.log('Factor no encontrado ', jsonObject.marca);
                    }
                } else {
                    console.log('Relacion de marca Vieja no encontrada ', jsonObject.marca, marca._id);
                }

            }));
        }
    }
});


