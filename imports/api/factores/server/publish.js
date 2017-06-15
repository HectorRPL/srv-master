/**
 * Created by Héctor on 13/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {Factores} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('factores.todos', () => {
        return Factores.find();
    });
}

if (Meteor.isServer) {
    // Trae un sólo factor buscado
    Meteor.publish('factores.buscarUno', function (filter, options) {
        const selector = {$and: [filter]};
        Counts.publish(this, 'numfactores', Factores.find(selector), {
            noReady: true
        });
        return Factores.find(selector, options);
    });

}