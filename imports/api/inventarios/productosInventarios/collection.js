/**
 * Created by jvltmtz on 7/04/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Marcas} from "../../catalogos/marcas/collection";
import {Productos} from "../../catalogos/productos/collection";
import {Factores} from "../../factores/collection";
import {Promociones} from "../../promociones/collection"
import {Comisiones} from "../../comisiones/collection"
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
    _id:            {type: String, regEx: SimpleSchema.RegEx.Id},
    inventarioId:   {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId:       {type: String, regEx: SimpleSchema.RegEx.Id},
    productoId:     {type: String, regEx: SimpleSchema.RegEx.Id},
    marcaId:        {type: String, regEx: SimpleSchema.RegEx.Id},
    factorId:       {type: String, regEx: SimpleSchema.RegEx.Id},
    fechaCreacion:  {type: Date,   defaultValue: new Date(), denyUpdate: true},
    cantidad:       {type: Number, defaultValue: 10, max: 10000, min: 0},
    costo:          {type: Number, decimal: true},
    promocionId:    {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    comisionId:     {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

ProductosInventarios.attachSchema(Schema.productosInventarios);

ProductosInventarios.helpers({
    marca(){
        return Marcas.findOne({_id: this.marcaId});
    },
    producto(){
        return Productos.findOne({_id: this.productoId});
    },
    factor(){
        return Factores.findOne({_id: this.factorId});
    },
    promocion(){
        return Promociones.findOne({_id: this.promocionId});
    },
    comision(){
        return Comisiones.findOne({_id: this.comisionId});
    },
    precioUno(){
        let precio = 0.0;
        const factor = Factores.findOne({_id: this.factorId});
        if (factor) {
            precio = this.costo * factor.factor1;
        }
        return precio;
    },
    precioDescuento(){
        let precio = 0;
        if (this.promocionId) {
            const promo = Promociones.findOne({_id: this.promocionId});
            if (promo) {
                if (promo.precioLista) {
                    const factor = Factores.findOne({_id: this.factorId});
                    if(factor){
                        precio = (this.costo * factor.factor1) * (1 - (promo.descuento / 100));
                    }
                } else {
                    precio = this.costo * (1 - (promo.descuento / 100));
                }
            }
        }
        return precio;
    }
});