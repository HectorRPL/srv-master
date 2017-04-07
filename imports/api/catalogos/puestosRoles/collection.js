/**
 * Created by jvltmtz on 3/04/17.
 */
import {Mongo} from "meteor/mongo";

export const PuestosRoles = new Mongo.Collection('puestosRoles');

PuestosRoles.deny({
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