/**
 * Created by jvltmtz on 19/04/17.
 */
import {Meteor} from "meteor/meteor";
import {ProductosInventarios} from "../collection";

if (Meteor.isServer) {
    // Trae t.o.d.o. el inventario
    Meteor.publish('productosInventarios.tiendaMarca', function (filter, options) {
        console.log('Filter ', options);
        const selector = {$and: [filter]};
        console.log(selector);
        Counts.publish(this, 'numProdsInventarios', ProductosInventarios.find(selector), {
            noReady: true
        });
        return ProductosInventarios.find(selector, options);
    });

}