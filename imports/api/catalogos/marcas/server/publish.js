/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {Marcas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('marcas.todas', function (filter, options) {
        Counts.publish(this, 'numMarcas', Marcas.find(filter), {
            noReady: true
        });
        return Marcas.find(filter, options);

    });

    Meteor.publish('marcas.nombre', function (nombre) {
        if (nombre.nombre) {
            const selector = {nombre: {$regex: nombre.nombre, $options: 'i'}};
            let options = {fields: {_id: 1, nombre: 1}};
            return Marcas.find(selector, options);
        } else {
            this.ready();
        }
    });

}