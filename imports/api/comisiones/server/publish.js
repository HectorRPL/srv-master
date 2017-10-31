/**
 * Created by Héctor on 24/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {Comisiones} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('comisiones.todos', function(filter, options) {

        Counts.publish(this, 'numComisiones', Comisiones.find(filter), {
            noReady: true
        });
        return Comisiones.find(filter, options);
    });
}