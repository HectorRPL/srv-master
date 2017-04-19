/**
 * Created by Héctor on 30/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {DatosFiscales} from "./collection";


const CAMPOS_DATOS_FISCALES = [
    'propietarioId',
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'razonSocial',
    'email',
    'rfc',
    'calle',
    'delMpio',
    'estado',
    'estadoId',
    'colonia',
    'codigoPostal',
    'numExt',
    'numInt',
    'personaFisica',
    'curp'
    // 'codigoPais', // se deja pendiente, pero deberá estar
];

export const insertarDatosFiscales = new ValidatedMethod({
    name: 'datosFiscales.insertarDatosFiscales',
    validate: DatosFiscales.simpleSchema().pick(CAMPOS_DATOS_FISCALES).validator({
        clean: true,
        filter: false
    }),
    run(
        {
            propietarioId,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            razonSocial,
            email,
            rfc,
            calle,
            delMpio,
            estado,
            estadoId,
            colonia,
            codigoPostal,
            numExt,
            numInt,
            personaFisica,
            curp
            //codigoPais, // se deja pendiente, pero deberá estar
    }
    ) {
        return DatosFiscales.insert({
            propietarioId,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            razonSocial,
            email,
            rfc,
            calle,
            delMpio,
            estado,
            estadoId,
            colonia,
            codigoPostal,
            numExt,
            numInt,
            personaFisica,
            curp
            //codigoPais, // se deja pendiente, pero deberá estar
        });
    }
});

const DATOS_FISCALES_PROVEEDORES_METHODS = _.pluck([insertarDatosFiscales], 'name');
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