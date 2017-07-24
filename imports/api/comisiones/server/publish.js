/**
 * Created by Héctor on 24/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {Comisiones} from "../collection";

if (Meteor.isServer) {
    // TODO: existen publish llamados 'todas' y 'todos'. Deberíamos estandarizarlo.
    Meteor.publish('comisiones.todos', function(filter, options) {
        console.log('[10] filter', filter);
        console.log('[11] options', options);

        Counts.publish(this, 'numComisiones', Comisiones.find(filter), {
            noReady: true
        });
        return Comisiones.find(filter, options);

        // TODO: Hace falta una revisión y estandarización de las validaciones en los publish:
        // No todos los publish tienen la validación y no sé si todas sean iguales para todas.



        /*

        TODO: ¿por qué la siguiente validación no es correcta?
        Intenté implementarla pensando en la premisa de que los publish siemre deben tener validación o posiblemente
        pudieran alentar a los navegadores. Entonces; intenté implementar esta validación sin éxito.

         if (Object.keys(filter).length === 0 && filter.constructor === Object) {
             console.log('Obviamente está entrando aquí');
             this.ready();
         } else {
            Counts.publish(this, 'numComisiones', Comisiones.find(filter), {
                noReady: true
            });
            return Comisiones.find(filter, options);

         }
         */


    });
}