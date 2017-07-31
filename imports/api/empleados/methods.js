/**
 * Created by Héctor on 13/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Empleados} from "./collection";

const ID = ['_id'];
const CAMPO_ACTIVO = ['activo'];
const CAMPOS_EMPLEADOS = [
    'primerNombre',
    'segundoNombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'celular',
    'departamentoId',
    'email',
    'nacimientoAnio',
    'nacimientoDia',
    'nacimientoMes',
    'sexo',
    'telefono'
];

export const cambiosEmpleados = new ValidatedMethod({
    name: 'empleados.cambiosEmpleados',
    mixins: [CallPromiseMixin],
    validate: Empleados.simpleSchema().pick(ID, CAMPOS_EMPLEADOS).validator({
        clean: true,
        filter: false
    }),
    run({
        _id,
        primerNombre,
        segundoNombre,
        apellidoPaterno,
        pellidoMaterno,
        celular,
        departamentoId,
        email,
        nacimientoAnio,
        nacimientoDia,
        nacimientoMes,
        sexo,
        telefono,
    }) {
        return Empleados.update({_id: _id}, {
            $set: {
                primerNombre,
                segundoNombre,
                apellidoPaterno,
                pellidoMaterno,
                celular,
                departamentoId,
                email,
                nacimientoAnio,
                nacimientoDia,
                nacimientoMes,
                sexo,
                telefono,
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

export const cambiosEmpleadosActivar = new ValidatedMethod({
    name: 'empleados.cambiosEmpleadosActivar',
    mixins: [CallPromiseMixin],
    validate: Empleados.simpleSchema().pick(ID, CAMPO_ACTIVO).validator({
        clean: true,
        filter: false
    }),
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


const EMPLEADOS_METHODS = _.pluck([cambiosEmpleados, cambiosEmpleadosActivar], 'name');
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