/**
 * Created by jvltmtz on 8/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Proveedores} from "./collection";

const ID = ['_id'];

const CAMPOS_PROVEEDORES = ['nombre', 'telefonos', 'telefonos.$', 'email'];
// Enviará un correo con un link al usuario para verificacar de registro
export const altaProveedor = new ValidatedMethod({
    name: 'proveedores.altaProveedor',
    validate: Proveedores.simpleSchema().pick(CAMPOS_PROVEEDORES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefonos, email}) {
        return Proveedores.insert({nombre, telefonos, email});
    }
});

const PROVEEDORES_METHODS = _.pluck([altaProveedor], 'name');
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