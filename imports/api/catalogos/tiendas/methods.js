/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Tiendas} from "./collection";

const ID = ['_id'];

const CAMPOS_TIENDAS = ['nombre', 'telefono', 'email'];
// Enviará un correo con un link al usuario para verificacar de registro
export const insertar = new ValidatedMethod({
    name: 'tiendas.insertar',
    mixins: [PermissionsMixin],
    allow: [
        {
            roles: ['aut_ventasTiendas'],
            group: 'gerente'
        }
    ],
    permissionsError: {
        name: 'tiendas.insertar',
        message: ()=> {
            return 'Acceso denegado';
        }
    },
    validate: Tiendas.simpleSchema().pick(CAMPOS_TIENDAS).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefono, email}) {
        return Tiendas.insert({nombre, telefono, email});
    }
});

const TIENDAS_METHODS = _.pluck([insertar], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(TIENDAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}