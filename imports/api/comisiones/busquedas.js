/**
 * Created by Héctor on 24/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {_} from "meteor/underscore";
import {Comisiones} from "./collection";

export const buscarComisiones = new ValidatedMethod({
    name: 'comisiones.buscarComisiones',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        comision: {type: String}
    }).validator(),
    run({comision}) {
        const selector = {nombre: {$regex: comision, $options: 'i'}};
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Comisiones.find(selector, options).fetch();
        return resultado;
    }
});

const BUSQUEDAS_COMISIONES_METHODS = _.pluck([buscarComisiones], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_COMISIONES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
