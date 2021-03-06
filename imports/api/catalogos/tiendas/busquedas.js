/**
 * Created by jvltmtz on 23/06/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method"
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Tiendas} from "./collection";

export const buscarTiendas = new ValidatedMethod({
    name: 'tiendas.buscarTiendas',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        nombre: {type: String}
    }).validator(),
    run({nombre}) {
        const partialMatch = new RegExp(`^${nombre}`, 'i');
        const selector = {nombre: {$regex: partialMatch}};
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Tiendas.find(selector, options).fetch();

        return resultado;
    }
});

export const buscarCuentaContableTiendas = new ValidatedMethod({
    name: 'proveedores.buscarCuentaContableTiendas',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        cc: {type: String}
    }).validator(),
    run({cc}) {
        const resultado = Tiendas.find({cuentaContable: cc}).fetch();
        return resultado;
    }
});

const BUSQUEDAS_TIENDAS_METHODS = _.pluck([buscarTiendas, buscarCuentaContableTiendas], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_TIENDAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}