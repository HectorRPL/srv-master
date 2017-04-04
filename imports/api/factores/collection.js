/**
 * Created by jvltmtz on 30/03/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Factores = new Mongo.Collection('factoes');

Factores.deny({
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

Factores.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true},
    marcaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    factores: {type: [Number]}

});

Factores.attachSchema(Factores.schema);