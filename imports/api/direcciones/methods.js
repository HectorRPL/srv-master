/**
 * Created by jvltmtz on 15/09/16.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {_} from "meteor/underscore";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {Direcciones} from "./collection.js";

const ID = ['_id'];

const CAMPOS_DIRECCION = ['propietarioId', 'calle', 'delMpio', 'estado', 'estadoId', 'colonia', 'codigoPostal', 'numExt', 'numInt', 'codigoPais'];

// CREAR DIRECCIÓN
export const crearDireccion = new ValidatedMethod({
    name: 'direcciones.crearDireccion',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_direcciones'],
            group: 'direcciones'
        }
    ],
    permissionsError: {
        name: 'direcciones.crearDireccion',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Direcciones.simpleSchema().pick(CAMPOS_DIRECCION).validator({
        clean: true,
        filter: false
    }),
    run({
        propietarioId, calle, delMpio, estado, estadoId, colonia,
        codigoPostal, numExt, numInt, codigoPais
    }) {
        const direccion = {
            propietarioId, calle, delMpio, estado, estadoId,
            colonia, codigoPostal, numExt, numInt, codigoPais
        };
        return Direcciones.insert(direccion,(err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

// ACTUALIZAR DIRECCIÓN
export const actualizarDireccion = new ValidatedMethod({
    name: 'direcciones.actualizarDireccion',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_direcciones'],
            group: 'direcciones'
        }
    ],
    permissionsError: {
        name: 'direcciones.actualizarDireccion',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Direcciones.simpleSchema().pick(ID, CAMPOS_DIRECCION).validator({
        clean: true,
        filter: false
    }),
    run({_id, calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais}) {

        return Direcciones.update({
            _id: _id
        }, {
            $set: {
                calle: calle,
                delMpio: delMpio,
                estado: estado,
                estadoId: estadoId,
                codigoPais: codigoPais,
                colonia: colonia,
                codigoPostal: codigoPostal,
                numExt: numExt,
                numInt: numInt
            }
        }, (err)=> {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

const DIRECCIONES_METHODS = _.pluck([crearDireccion, actualizarDireccion], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(DIRECCIONES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}