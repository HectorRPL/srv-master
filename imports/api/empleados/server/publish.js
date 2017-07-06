/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {Empleados} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('empleados.porTienda', function (filter, options) {

        Counts.publish(this, 'numEmpleados', Empleados.find(filter), {
            noReady: true
        });

        return Empleados.find(filter, options);
    });

}