/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {PuestosRoles} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('puestoRoles', function () {
        const selector = {
            $and: [
                {_id: {$ne: '__global_roles__'}},
                {_id: {$ne: 'CRUDTIENDAS'}},
                {_id: {$ne: 'CRUDMARCAS'}},
                {_id: {$ne: 'CRUDPRODUCTOS'}},
                {_id: {$ne: 'CRUDPROVEEDORES'}}
            ]
        };
        return PuestosRoles.find(selector);
    });
}