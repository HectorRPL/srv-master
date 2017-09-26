/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Tiendas} from "./collection";
import {crearInventario} from "../../inventarios/methods";

const ID = ['_id'];

const CAMPO_CUENTA_CONTABLE = ['cuentaContable'];

const CAMPOS_TIENDAS = ['nombre', 'telefonos', 'telefonos.$', 'email'];

const CAMPO_ACTIVO = ['activo'];

export const crearTienda = new ValidatedMethod({
    name: 'tiendas.crearTienda',
    mixins: [CallPromiseMixin, PermissionsMixin],
    allow: [
        {
            roles: ['crea_tien'],
            group: 'crudtiendas'
        }
    ],
    permissionsError: {
        name: 'tiendas.crearTienda',
        message: ()=> {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Tiendas.simpleSchema().pick(CAMPOS_TIENDAS, CAMPO_CUENTA_CONTABLE).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefonos, email, cuentaContable}) {
        if (Meteor.isServer) {
            return Tiendas.insert({nombre, telefonos, email, cuentaContable}, (err, result) => {
                if (err) {
                    throw err;
                }
                Meteor.defer(() => {
                    crearInventario.call({tiendaId: result});
                });
            });
        }
    }
});

export const actualizarTienda = new ValidatedMethod({
    name: 'datosFiscales.actualizarTienda',
    mixins: [CallPromiseMixin],
    validate: Tiendas.simpleSchema().pick(ID, CAMPOS_TIENDAS).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, email, nombre, telefonos
    }) {
        return Tiendas.update({_id: _id}, {
            $set: {
                email, nombre, telefonos
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

export const actlzrCuntContblTind = new ValidatedMethod({
    name: 'tiendas.actlzrCuntContblTind',
    mixins: [CallPromiseMixin],
    validate: Tiendas.simpleSchema().pick(ID, CAMPO_CUENTA_CONTABLE).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, cuentaContable
    }) {
        return Tiendas.update({_id: _id}, {
            $set: {
                cuentaContable
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

export const actlzrTindActvr = new ValidatedMethod({
    name: 'tiendas.actlzrTindActvr',
    mixins: [CallPromiseMixin],
    validate: Tiendas.simpleSchema().pick(ID, CAMPO_ACTIVO).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, activo
    }) {
        return Tiendas.update({_id: _id}, {
            $set: {
                activo
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

const TIENDAS_METHODS = _.pluck([crearTienda, actualizarTienda, actlzrCuntContblTind, actlzrTindActvr], 'name');
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