/**
 * Created by Héctor on 24/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {_} from "meteor/underscore";
import {Comisiones} from "./collection";
import {BitaFactPromoComi} from "../bitacoras/factoresPromo/collection";

const CAMPOS_COMISIONES = ['nombre', 'comisionProdInt', 'comisionProdExt'];
const CAMPO_ID = ['_id'];

export const crearComision = new ValidatedMethod({
    name: 'comisiones.crearComision',
    mixins: [PermissionsMixin, CallPromiseMixin, LoggedInMixin],
    allow: [
        {
            roles: ['crea_comisiones'],
            group: 'comisiones'
        }
    ],
    permissionsError: {
        name: 'comisiones.crearComision',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Comisiones.simpleSchema().pick(CAMPOS_COMISIONES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, comisionProdInt, comisionProdExt}) {
        return Comisiones.insert({
            nombre,
            comisionProdInt,
            comisionProdExt
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

export const actualizarComision = new ValidatedMethod({
    name: 'comisiones.actualizarComision',
    mixins: [PermissionsMixin, CallPromiseMixin, LoggedInMixin],
    allow: [
        {
            roles: ['actua_comisiones'],
            group: 'comisiones'
        }
    ],
    permissionsError: {
        name: 'comisiones.actualizarComision',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Comisiones.simpleSchema().pick(CAMPO_ID, CAMPOS_COMISIONES).validator({
        clean: true,
        filter: false
    }),
    run({
            _id, nombre, comisionProdInt, comisionProdExt
        }) {
        return Comisiones.update({
            _id: _id
        }, {
            $set: {
                nombre: nombre,
                comisionProdInt: comisionProdInt,
                comisionProdExt: comisionProdExt
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

const COMISIONES_METHODS = _.pluck([crearComision, actualizarComision], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(COMISIONES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}