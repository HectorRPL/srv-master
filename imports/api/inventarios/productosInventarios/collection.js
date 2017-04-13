/**
 * Created by jvltmtz on 7/04/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
export const ProductosInventarios = new Mongo.Collection('productosInventarios');

ProductosInventarios.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.productosInventarios = new SimpleSchema({
    _id:                {type: String,  regEx: SimpleSchema.RegEx.Id},
    inventarioId:       {type: String,  regEx: SimpleSchema.RegEx.Id},
    poductoId:          {type: String,  regEx: SimpleSchema.RegEx.Id},
    fechaCreacion:      {type: Date,    defaultValue: new Date(), denyUpdate: true},
    cantidad:           {type: Number, defaultValue:0 },
    precioCliente:      {type: Number, decimal:true, defaultValue:0.0}
});

ProductosInventarios.attachSchema(Schema.productosInventarios);
