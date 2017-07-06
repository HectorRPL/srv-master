/**
 * Created by Héctor on 13/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {Factores} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('factores.todos', function(filter, options) {

        Counts.publish(this, 'numFactores', Factores.find(filter), {
            noReady: true
        });

        return Factores.find(filter, options);
    });
}
