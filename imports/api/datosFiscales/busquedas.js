/**
 * Created by Héctor on 15/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {_} from "meteor/underscore";
import {DatosFiscales} from "./collection";

export const buscarRfc = new ValidatedMethod({
    name: 'datosFiscales.buscarRfc',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        rfc: {type: String}
    }).validator(),
    run({rfc}) {
        const resultado = DatosFiscales.findOne({_id: rfc});
        return resultado ? true : false;
    }
});

const BUSQUEDAS_DATOS_FISCALES_METHODS = _.pluck([buscarRfc], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_DATOS_FISCALES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
