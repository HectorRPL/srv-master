/**
 * Created by Héctor on 13/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Empleados} from "./collection";

const ID = ['_id'];
const CAMPO_DEPARTAMENTOID = ['departamentoId'];
const CAMPOS_EMPLEADOS = [ 'nombres', 'apellidos', 'celular', 'email', 'nacimientoAnio', 'nacimientoDia', 'nacimientoMes', 'sexo', 'telefono'];

export const actualizarEmpleado = new ValidatedMethod({
    name: 'empleados.actualizarEmpleado',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_empleados'],
            group: 'empleados'
        }
    ],
    permissionsError: {
        name: 'empleados.actualizarEmpleado',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Empleados.simpleSchema().pick(ID, CAMPOS_EMPLEADOS).validator({
        clean: true,
        filter: false
    }),
    run({_id, nombres, apellidos, celular, email, nacimientoAnio, nacimientoDia, nacimientoMes, sexo, telefono,}) {
        return Empleados.update({_id: _id}, {
            $set: {nombres, apellidos, celular, email, nacimientoAnio, nacimientoDia, nacimientoMes, sexo, telefono,}
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

export const actlzrEmpldActvr = new ValidatedMethod({
    name: 'empleados.actlzrEmpldActvr',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_empleados'],
            group: 'empleados'
        }
    ],
    permissionsError: {
        name: 'empleados.actlzrEmpldActvr',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        _id: {type: String, regEx: SimpleSchema.RegEx.Id},
        activo: {type: Boolean}
    }).validator(),
    run({
        _id, activo
    }) {
        return Empleados.update({_id: _id}, {
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

export const actlzrEmpldPust = new ValidatedMethod({
    name: 'empleados.actlzrEmpldPust',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_empleados'],
            group: 'empleados'
        }
    ],
    permissionsError: {
        name: 'empleados.actlzrEmpldPust',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        _id: {type: String, regEx: SimpleSchema.RegEx.Id},
        departamentoId: {type: String}
    }).validator(),
    run({
        _id, departamentoId
    }) {
        return Empleados.update({_id: _id}, {
            $set: {
                departamentoId
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

const EMPLEADOS_METHODS = _.pluck([actualizarEmpleado, actlzrEmpldActvr, actlzrEmpldPust], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(EMPLEADOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}