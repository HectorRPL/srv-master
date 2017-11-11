/**
 * Created by Héctor on 11/11/2017.
 */
import {Meteor}            from "meteor/meteor";
import {MarcasProveedores} from "../collection";

if (Meteor.isServer) {

    Meteor.publish('marcasProveedores.lista', function (filter, options) {

        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {

            const selector = filter;
            Counts.publish(this, 'numMarcasProveedores', MarcasProveedores.find(selector), {
                noReady: true
            });
            return MarcasProveedores.find(selector, options);
        }
    });
}