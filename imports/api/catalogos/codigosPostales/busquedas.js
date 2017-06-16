/**
 * Created by Héctor on 29/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {CodigosPostales} from "./collection.js";

export const buscarColonias = new ValidatedMethod({
    name: 'codigosPostales.buscarColonias',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        cp: {type: String}
    }).validator(),
    run({cp}) {
        const resultado = CodigosPostales.find({codigo: cp}).fetch();
        return resultado;
    }
});

const BUSCAR_CODIGOS_POSTALES_METODOS = _.pluck([buscarColonias], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSCAR_CODIGOS_POSTALES_METODOS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
