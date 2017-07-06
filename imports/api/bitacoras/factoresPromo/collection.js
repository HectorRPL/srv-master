/**
 * Created by jvltmtz on 28/06/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const BitaFactoresPromo = new Mongo.Collection('bitaFactoresPromo');

BitaFactoresPromo.deny({
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

Schema.bitaFactoresPromo = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    usuarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    operacion: {type: String},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true},
    productoId: {type: String, optional: true},
    marcaId: {type: String, optional: true},
    excepciones: {type: [String], blackbox:true, optional: true},
});

BitaFactoresPromo.attachSchema(Schema.bitaFactoresPromo);