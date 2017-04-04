/**
 * Created by jvltmtz on 30/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Factores} from "./collection";

const ID = ['_id'];

const CAMPOS_FACTORES = ['marcaId, tiendaId, factores'];
// Enviará un correo con un link al usuario para verificacar de registro
export const insertar = new ValidatedMethod({
    name: 'factores.insertar',
    validate: Factores.simpleSchema().pick(CAMPOS_FACTORES).validator({
        clean: true,
        filter: false
    }),
    run({marcaId, tiendaId, factores}) {
        return Factores.insert({marcaId, tiendaId, factores});
    }
});

const FACTORES_METHODS = _.pluck([insertar], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(FACTORES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}