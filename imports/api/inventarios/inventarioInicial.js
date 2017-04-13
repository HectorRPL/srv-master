/**
 * Created by jvltmtz on 1/02/17.
 */
import {Meteor} from "meteor/meteor";
import {Random} from 'meteor/random'
import {Productos} from "../catalogos/productos/collection";
import {Marcas} from "../catalogos/marcas/collection";
import {ProductosInventarios} from "./productosInventarios/collection";
import {_} from "meteor/underscore";

ProdsInvntariosUtils = {
    generarInventarioInicial(inventarioId){

        console.log("Entro a generar el inventario inicial");
        const marcas = Marcas.find();
        marcas.forEach((marca)=>{
            const productos = Productos.find({marcaId : marca._id});
            if(productos.count() > 0){
                let bulkProdsInv = ProductosInventarios.rawCollection().initializeUnorderedBulkOp();
                productos.forEach((producto)=> {
                    const productoInven = {
                        _id: Random.id(),
                        inventarioId: inventarioId,
                        productoId: producto._id,
                        fechaCreacion: new  Date(),
                        costo: producto.costoDefault
                    };
                    //prodsInv.push(productoInven);
                    bulkProdsInv.insert(productoInven);
                });
                let options = {forceServerObjectId: false};
                //ProductosInventarios.rawCollection().insertMany(prodsInv, options, (err, result)=>{
                   //console.log(err);
                   //console.log(result);
                //});
                bulkProdsInv.execute((err, res)=>{
                    console.log(err);
                    console.log(res);
                });
                //console.log(`Invenatrio de ${marca.nombre}: creado.`);
            }else{
                //console.log(`Invenatrio de ${marca.nombre}: 0`);
            }

        });


    },

    actualizarPostulaciones(carritoId){

    },


};
