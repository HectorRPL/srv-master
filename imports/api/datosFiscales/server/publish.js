/**
 * Created by Héctor on 27/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {DatosFiscales} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('datosFiscales.proveedor', function (filter) {

        if (Object.keys(filter).length === 0 && filter.constructor === Object) {
            this.ready();
        } else {
            return DatosFiscales.find(filter);
        }
    });
}
