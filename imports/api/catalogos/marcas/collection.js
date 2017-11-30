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
    nombre: {
        type: String,
        // regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        min: 2,
        max: 50,
        autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    activo: {
        type: Boolean,
        defaultValue: true
    },
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    }
});

Marcas.attachSchema(Marcas.schema);