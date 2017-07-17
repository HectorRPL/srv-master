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

export const bajaUsuario = new ValidatedMethod({
    name: 'usuarios.bajaUsuario',
    mixins: [CallPromiseMixin, PermissionsMixin],
    /* todo: falta que juan me explique que es lo que va aquí:
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
    */
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





const USUARIOS_METHODS = _.pluck([altaUsuario, bajaUsuario], 'name');
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