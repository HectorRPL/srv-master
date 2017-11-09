/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {Tiendas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('tiendas.todas', function (filter, options) {
        Counts.publish(this, 'numTiendas', Tiendas.find(filter), {
            noReady: true
        });
        return Tiendas.find(filter, options);
    });

    Meteor.publish('tiendas.seleccionada', function (tiendaId) {

        return Tiendas.find(tiendaId);
    });

}