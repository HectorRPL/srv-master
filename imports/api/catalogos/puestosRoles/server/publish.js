/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {PuestosRoles} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('puestoRoles', function () {
        const selector = { };
        return PuestosRoles.find(selector);
    });
}