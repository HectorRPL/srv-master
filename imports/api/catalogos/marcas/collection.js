/**
 * Created by jvltmtz on 9/03/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Marcas = new Mongo.Collection('marcas');

Marcas.deny({
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

Marcas.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    proveedorId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true
    },
    nombre: {
        type: String,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        min: 2,
        max: 50
    },
    activo: {
        type: Boolean,
        defaultValue: true
    }
});

Marcas.attachSchema(Marcas.schema);