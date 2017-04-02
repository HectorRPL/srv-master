/**
 * Created by jvltmtz on 9/03/17.
 */

import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Tiendas = new Mongo.Collection('tiendas');

Tiendas.deny({
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

Tiendas.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
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
    telefono: {
        type: String,
        optional: true
    },
    extension: {
        type: String,
        optional: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    activo: {
        type: Boolean,
        defaultValue: true
    }
});

Tiendas.attachSchema(Tiendas.schema);