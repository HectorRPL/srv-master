/**
 * Created by jvltmtz on 15/09/16.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin"
import {_} from "meteor/underscore";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {Direcciones} from "./collection.js";

const ID = ['_id'];

const CAMPOS_DIRECCION = ['propietarioId', 'calle', 'delMpio', 'estado', 'estadoId', 'colonia', 'codigoPostal', 'numExt', 'numInt', 'codigoPais'];

// CREAR CANDIDATO
export const crearDireccion = new ValidatedMethod({
    name: 'direcciones.crear',
        mixins: [PermissionsMixin],
        allow: [
            {
                roles: ['crea_dire'],
                group: 'cruddirecciones'
            }
        ],
        permissionsError: {
            name: 'direcciones.crear',
            message: ()=> {
                return 'Acceso denegado';
            }
        },
    validate: Direcciones.simpleSchema().pick(CAMPOS_DIRECCION).validator({
        clean: true,
        filter: false
    }),
    run({propietarioId, calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt, codigoPais}) {
        if (Meteor.isServer) {
            const direccion = {
                propietarioId,
                calle,
                delMpio,
                estado,
                estadoId,
                colonia,
                codigoPostal,
                numExt,
                numInt,
                codigoPais
            };
            return Direcciones.insert(direccion);
        }
    }
});

// ACTUALIZAR DIRECCIÓN
export const actualizar = new ValidatedMethod({
    name: 'direcciones.actualizar',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
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
        });
    }
});

const DIRECCIONES_METHODS = _.pluck([crearDireccion, actualizar], 'name');
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