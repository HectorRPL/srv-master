/**
 * Created by jvltmtz on 7/04/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Marcas} from "../../catalogos/marcas/collection";
import {Productos} from "../../catalogos/productos/collection";
import opProductosInvetarios from "./operacionesEventos";


class ProductosInventariosCollection extends Mongo.Collection {
    update(selector, modifier) {
        const result = super.update(selector, modifier);
        opProductosInvetarios.afterUpdateProductoInventario(selector, modifier);
        return result;
    }
}

export const ProductosInventarios = new ProductosInventariosCollection('productosInventarios');


ProductosInventarios.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

const Schema = {};

Schema.productosInventarios = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    inventarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    productoId: {type: String, regEx: SimpleSchema.RegEx.Id},
    marcaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    factorId: {type: String, regEx: SimpleSchema.RegEx.Id},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true},
    cantidad: {type: Number, defaultValue: 10},
    costo: {type: Number, decimal: true},
    promocionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

ProductosInventarios.attachSchema(Schema.productosInventarios);

ProductosInventarios.helpers({
    marca(){
        return Marcas.findOne({_id: this.marcaId});
    },
    producto(){
        return Productos.findOne({_id: this.productoId});
    }
});