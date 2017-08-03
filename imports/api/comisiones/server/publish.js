/**
 * Created by Héctor on 24/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {Comisiones} from "../collection";

if (Meteor.isServer) {
    // TODO: existen publish llamados 'todas' y 'todos'. Deberíamos estandarizarlo.
    Meteor.publish('comisiones.todos', function(filter, options) {

        Counts.publish(this, 'numComisiones', Comisiones.find(filter), {
            noReady: true
        });
        return Comisiones.find(filter, options);

        // TODO: Hace falta una revisión y estandarización de las validaciones en los publish:
        // No todos los publish tienen la validación y no sé si todas sean iguales para todas.

    });
}