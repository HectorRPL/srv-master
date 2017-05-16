/**
 * Created by jvltmtz on 12/05/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const SociedadesMercantiles = new Mongo.Collection('sociedadesMercantiles');

SociedadesMercantiles.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});


SociedadesMercantiles.schema = new SimpleSchema({
    _id:                {type: String},
    abreviacion:        {type: String}
});

SociedadesMercantiles.attachSchema(SociedadesMercantiles.schema);