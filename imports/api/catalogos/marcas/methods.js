/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Marcas} from "./collection";

const ID = ['_id'];

const CAMPOS_MARCAS = ['nombre'];
// Enviará un correo con un link al usuario para verificacar de registro
export const insertar = new ValidatedMethod({
    name: 'marcas.insertar',
    validate: Marcas.simpleSchema().pick(CAMPOS_MARCAS).validator({
        clean: true,
        filter: false
    }),
    run({nombre}) {
        return Marcas.insert({nombre});
    }
});

const MARCAS_METHODS = _.pluck([insertar], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(MARCAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}