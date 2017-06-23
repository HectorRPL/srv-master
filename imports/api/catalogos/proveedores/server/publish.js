/**
 * Created by jvltmtz on 8/03/17.
 */
import {Meteor} from "meteor/meteor";
import {Proveedores} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('proveedores.todos', function (filter, options) {

        Counts.publish(this, 'numProveedores', Proveedores.find(filter), {
            noReady: true
        });
        return Proveedores.find(filter, options);
    });

}