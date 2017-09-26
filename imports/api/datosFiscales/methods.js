/**
 * Created by Héctor on 30/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {DatosFiscales} from "./collection";

const CAMPO_ID = ['_id'];
const CAMPO_PROPIETARIOID = ['propietarioId'];
const CAMPOS_DATOS_FISCALES = ['tipoPersona', 'nombres', 'apellidos', 'razonSocial', 'tipoSociedad', 'email'];
const CAMPOS_DIRECCION_FISCAL = ['calle', 'delMpio', 'estado', 'estadoId', 'colonia', 'codigoPostal', 'numExt', 'numInt', 'codigoPais'];

export const crearDatoFiscal = new ValidatedMethod({
    name: 'datosFiscales.crearDatoFiscal',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_datos_fiscales'],
            group: 'datos_fiscales'
        }
    ],
    permissionsError: {
        name: 'datosFiscales.crearDatoFiscal',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: DatosFiscales.simpleSchema().pick(CAMPO_ID, CAMPO_PROPIETARIOID, CAMPOS_DATOS_FISCALES, CAMPOS_DIRECCION_FISCAL).validator({
        clean: true,
        filter: false
    }),
    run({
        _id, propietarioId, tipoPersona,
        nombres, apellidos, razonSocial, tipoSociedad, email,
        calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
    }) {
        return DatosFiscales.insert({ _id, propietarioId, tipoPersona,
            nombres, apellidos, razonSocial, tipoSociedad, email,
            calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
        }, (err)=> {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

export const actlzrDatsFiscls = new ValidatedMethod({
    name: 'datosFiscales.actlzrDatsFiscls',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_datos_fiscales'],
            group: 'datos_fiscales'
        }
    ],
    permissionsError: {
        name: 'datosFiscales.actlzrDatsFiscls',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: DatosFiscales.simpleSchema().pick(CAMPO_PROPIETARIOID, CAMPOS_DIRECCION_FISCAL).validator({
        clean: true,
        filter: false
    }),
    run({propietarioId, calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais
    }) {
        return DatosFiscales.update({propietarioId: propietarioId},
            {$set: { calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais}
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

const DATOS_FISCALES_PROVEEDORES_METHODS = _.pluck([crearDatoFiscal, actlzrDatsFiscls], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(DATOS_FISCALES_PROVEEDORES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}