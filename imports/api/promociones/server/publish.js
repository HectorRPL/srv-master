/**
 * Created by jvltmtz on 11/07/17.
 */
import {Meteor} from "meteor/meteor";
import {Promociones} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('promociones.todos', function(filter, options) {

        Counts.publish(this, 'numPromociones', Promociones.find(filter), {
            noReady: true
        });

        return Promociones.find(filter, options);
    });

}