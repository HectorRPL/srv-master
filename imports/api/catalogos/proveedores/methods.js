/**
 * Created by jvltmtz on 8/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Proveedores} from "./collection";

const ID = ['_id'];

const CAMPOS_PROVEEDORES = ['nombre', 'telefono', 'email'];
// Enviará un correo con un link al usuario para verificacar de registro
export const insertar = new ValidatedMethod({
    name: 'proveedores.insertar',
    validate: Proveedores.simpleSchema().pick(CAMPOS_PROVEEDORES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefono, mail}) {
        return Proveedores.insert({nombre, telefono, mail});
    }
});

const PROVEEDORES_METHODS = _.pluck([insertar], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(PROVEEDORES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}