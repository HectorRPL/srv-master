/**
 * Created by Héctor on 24/07/2017.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Comisiones = new Mongo.Collection('comisiones');

Comisiones.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

Comisiones.schema = new SimpleSchema({
    _id:             {type:  String,  regEx: SimpleSchema.RegEx.Id},
    nombre:          {type:  String,  autoValue: function () { return this.value.toUpperCase() } },
    comisionProdInt: {type:  Number,  defaultValue: 0.0, decimal: true, max: 20, min: .0001},
    comisionProdExt: {type:  Number,  defaultValue: 0.0, decimal: true, max: 20, min: .0001},
    fechaCreacion:   {type:  Date,    defaultValue: new Date(), denyUpdate: true}
});

Comisiones.attachSchema(Comisiones.schema);