/**
 * Created by jvltmtz on 26/04/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const DescuentosProveedores = new Mongo.Collection('descuentosProveedores');

DescuentosProveedores.deny({
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

DescuentosProveedores.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    descuento: {
        type: Number,
    },
    proveedorId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});

DescuentosProveedores.attachSchema(DescuentosProveedores.schema);