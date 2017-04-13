/**
 * Created by jvltmtz on 30/03/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Factores = new Mongo.Collection('factores');

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
    fechaCreacion: {type:  Date,   defaultValue: new Date(), denyUpdate: true},
    _id:           {type:  String, regEx: SimpleSchema.RegEx.Id},
    nombre:        {type:  String  },
    factor1:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true},
    factor2:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true},
    factor3:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true},
    factor4:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true},
    factor5:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true},
    factor6:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true},
    factor7:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true},
    factor8:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true},
    factor9:       {type:  Number, min: 1.0000, max: 4.0000, defaultValue: 1.0000, decimal: true}
});

Factores.attachSchema(Factores.schema);