/**
 * Created by jvltmtz on 28/03/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const MarcasProveedores = new Mongo.Collection('marcasProveedores');

MarcasProveedores.deny({
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

MarcasProveedores.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    proveedorId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    marcasId: {
        type: [String],
        regEx: SimpleSchema.RegEx.Id
    }
});

MarcasProveedores.attachSchema(MarcasProveedores.schema);