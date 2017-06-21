/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {_} from "meteor/underscore";

const ID = ['_id'];

export const altaUsuario = new ValidatedMethod({
    name: 'usuarios.altaUsuario',
    mixins: [CallPromiseMixin, PermissionsMixin],
    allow: [
        {
            roles: ['crea_usua'],
            group: '__global_roles__'
        }
    ],
    permissionsError: {
        name: 'tiendas.insertar',
        message: ()=> {
            return 'Acceso denegado';
        }
    },
    validate: new SimpleSchema({
        password: {type: String},
        username: {type: String},
        email: {type:String},
        profile: {type: Object, blackbox: true},
    }).validator(),
    run({password, username, profile}) {

        if (Meteor.isServer) {
            return Accounts.createUser({password, username, profile});
        }
    }
});


const USUARIOS_METHODS = _.pluck([altaUsuario], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(USUARIOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}