/**
 * Created by jvltmtz on 1/02/17.
 */
import {Meteor} from "meteor/meteor";
import {Random} from 'meteor/random'
import {Productos} from "../catalogos/productos/collection";
import {Marcas} from "../catalogos/marcas/collection";
import {ProductosInventarios} from "./productosInventarios/collection";
import {Inventarios} from "../inventarios/collection";
import {_} from "meteor/underscore";

ProdsInvntariosUtils = {
    generarInventarioInicial(inventarioId, tiendaId){

        console.log("Entro a generar el inventario inicial ", tiendaId, inventarioId);
        const marcas = Marcas.find();
        marcas.forEach((marca)=> {
            const productos = Productos.find({marcaId: marca._id});
            if (productos.count() > 0) {
                let bulkProdsInv = ProductosInventarios.rawCollection().initializeUnorderedBulkOp();
                productos.forEach((producto)=> {
                    const productoInven = {
                        _id: Random.id(),
                        inventarioId: inventarioId,
                        tiendaId: tiendaId,
                        productoId: producto._id,
                        marcaId: producto.marcaId,
                        fechaCreacion: new Date(),
                        costo: producto.costoProveedor,
                        factorId: producto.factorDefaultId,
                        cantidad: 10
                    };
                    bulkProdsInv.insert(productoInven);
                });
                let options = {forceServerObjectId: false};
                bulkProdsInv.execute((err, res)=> {
                    if (err) {

                    }
                    console.log(err);
                    console.log(res);
                });
                //console.log(`Invenatrio de ${marca.nombre}: creado.`);
            } else {
                //console.log(`Invenatrio de ${marca.nombre}: 0`);
            }

        });


    },

    generarInventarioMarca(tiendaId, marcaId){
        const productos = Productos.find({marcaId: marcaId});
        const inventario = Inventarios.findOne({tiendaId: tiendaId});

        productos.forEach((producto)=> {
            const productoInven = {
                _id: Random.id(),
                inventarioId: inventario._id,
                tiendaId: tiendaId,
                productoId: producto._id,
                marcaId: producto.marcaId,
                fechaCreacion: new Date(),
                costo: producto.costoProveedor,
                factorId: producto.factorDefaultId,
                cantidad: 0
            };

            ProductosInventarios.insert(productoInven, (err)=>{
                if(err){
                    console.log('Error al insertar el producto ', producto._id, err.message);
                }
            });

        });


    },


};
