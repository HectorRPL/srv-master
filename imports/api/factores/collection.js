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
    _id:           {type:  String, regEx: SimpleSchema.RegEx.Id},
    nombre:        {type:  String, autoValue: function () { return this.value.toUpperCase() } },
    factor1:       {type:  Number, defaultValue: 1.0, decimal: true},
    factor2:       {type:  Number, defaultValue: 1.0, decimal: true},
    factor3:       {type:  Number, defaultValue: 1.0, decimal: true},
    factor4:       {type:  Number, defaultValue: 1.0, decimal: true},
    factor5:       {type:  Number, defaultValue: 1.0, decimal: true},
    factor6:       {type:  Number, defaultValue: 1.0, decimal: true},
    factor7:       {type:  Number, defaultValue: 1.0, decimal: true},
    factor8:       {type:  Number, defaultValue: 1.0, decimal: true},
    factorCosto:   {type:  Number, defaultValue: 1.0, decimal: true},
    activo:        {type: Boolean, defaultValue:true},
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    }
});

Factores.attachSchema(Factores.schema);