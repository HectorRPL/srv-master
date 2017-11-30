/**
 * Created by jvltmtz on 28/06/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const BitaFactPromoComi = new Mongo.Collection('bitaFactPromoComi');

BitaFactPromoComi.deny({
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

Schema.bitaFactPromoComi = new SimpleSchema({
    _id: {type: String},
    usuarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    nuevoValorId: {type: String, regEx: SimpleSchema.RegEx.Id},
    operacion: {type: String},
    productoInventarioId: {type: String, optional: true},
    marcaId: {type: String, optional: true},
    excepciones: {type: [String], blackbox: true, optional: true},
    productos: {type: [String], blackbox: true, optional: true},
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    }
});

BitaFactPromoComi.attachSchema(Schema.bitaFactPromoComi);