/**
 * Created by jvltmtz on 8/03/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Proveedores = new Mongo.Collection('proveedores');

Proveedores.deny({
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

Proveedores.schema = new SimpleSchema({
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
        //regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        min: 2,
        max: 70,
        autoValue: function () {
            return this.value.toUpperCase()
        }

    },
    telefonos: {
        type: [Object],
        optional: true,
        blackbox: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    activo: {
        type: Boolean,
        defaultValue: true
    },
    cuentaContable: {
        type: String
    },
    dias: {
        type: Number,
        optional: true
    }
});

Proveedores.attachSchema(Proveedores.schema);