/**
 * Created by jvltmtz on 8/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Proveedores} from "./collection";


const ID = ['_id'];
const CAMPOS_PROVEEDORES = ['nombre', 'telefonos', 'telefonos.$', 'email'];
const CAMPO_CUENTA_CONTABLE = ['cuentaContable'];
const CAMPO_ACTIVO = ['activo'];

export const crearProveedor = new ValidatedMethod({
    name: 'proveedores.crearProveedor',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_proveedores'],
            group: 'proveedores'
        }
    ],
    permissionsError: {
        name: 'proveedores.crearProveedor',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Proveedores.simpleSchema().pick(CAMPOS_PROVEEDORES, CAMPO_CUENTA_CONTABLE).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefonos, email, cuentaContable}) {
        return Proveedores.insert({nombre, telefonos, email, cuentaContable});
    }
});

export const actualizarProvdrDats = new ValidatedMethod({
    name: 'proveedores.actualizarProvdrDats',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_proveedores'],
            group: 'proveedores'
        }
    ],
    permissionsError: {
        name: 'proveedores.actualizarProvdrDats',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Proveedores.simpleSchema().pick(ID, CAMPOS_PROVEEDORES).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, email, nombre, telefonos
    }) {
        return Proveedores.update({_id: _id}, {
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

export const actualizarProvdrCuntCont = new ValidatedMethod({
    name: 'proveedores.actualizarProvdrCuntCont',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_proveedores'],
            group: 'proveedores'
        }
    ],
    permissionsError: {
        name: 'proveedores.actualizarProvdrCuntCont',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Proveedores.simpleSchema().pick(ID, CAMPO_CUENTA_CONTABLE).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, cuentaContable
    }) {
        return Proveedores.update({_id: _id}, {
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

export const actualizarProvdrActv = new ValidatedMethod({
    name: 'proveedores.actualizarProvdrActv',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_proveedores'],
            group: 'proveedores'
        }
    ],
    permissionsError: {
        name: 'proveedores.actualizarProvdrActv',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Proveedores.simpleSchema().pick(ID, CAMPO_ACTIVO).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, activo
    }) {
        return Proveedores.update({_id: _id}, {
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

const PROVEEDORES_METHODS = _.pluck([crearProveedor, actualizarProvdrDats, actualizarProvdrCuntCont, actualizarProvdrActv], 'name');
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