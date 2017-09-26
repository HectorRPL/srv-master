/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";

const ID = ['_id'];

export const crearUsuario = new ValidatedMethod({
    name: 'usuarios.crearUsuario',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_usuarios'],
            group: '__global_roles__'
        }
    ],
    permissionsError: {
        name: 'usuarios.crearUsuario',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
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

export const borrarUsuario = new ValidatedMethod({
    name: 'usuarios.borrarUsuario',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['borr_usuarios'],
            group: '__global_roles__'
        }
    ],
    permissionsError: {
        name: 'usuarios.borrarUsuario',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        _id: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({_Id}) {
        return Users.remove({_Id: _Id}, (err) => {
            if (err) {
                console.log('[82]', err);
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

const USUARIOS_METHODS = _.pluck([crearUsuario, borrarUsuario], 'name');
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