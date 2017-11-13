/**
 * Created by jvltmtz on 17/04/17.
 */

import {Mongo} from "meteor/mongo";
export const Counters = new Mongo.Collection('counters');

Counters.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});


const Schema = {};

Schema.counters = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    tiendaId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    nombre: {
        type: String
    },
    seq: {
        type: Number,
        defaultValue: 0
    }
});

Counters.attachSchema(Schema.counters);
