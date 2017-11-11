/**
 * Created by Héctor on 10/11/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {MarcasProveedores} from "./collection";

export const actlizrMarcsProvdrs = new ValidatedMethod({
    name: 'marcasProveedores.actlizrMarcsProvdrs',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_marcas_proveedores'],
            group: 'marcas_proveedores'
        }
    ],
    permissionsError: {
        name: 'marcasProveedores.actlizrMarcsProvdrs',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        proveedorId: {type: String, regEx: SimpleSchema.RegEx.Id},
        marcaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({
        proveedorId, marcaId
    }) {

        if (Meteor.isServer) {
            return MarcasProveedores.update({proveedorId: proveedorId},
                {$addToSet: {marcasId: marcaId}}
            ), (err) => {
                if (err) {
                    console.log(err);
                    throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
                }
            };
        }
    }
});

export const borrarMarcaProveedor = new ValidatedMethod({
    name: 'marcasProveedores.borrarMarcaProveedor',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['actu_marcas_proveedores'],
            group: 'marcas_proveedores'
        }
    ],
    permissionsError: {
        name: 'marcasProveedores.borrarMarcaProveedor',
        message: () => {
            return 'Este usuario no cuenta con los permisos necesarios.';
        }
    },
    validate: new SimpleSchema({
        proveedorId: {type: String, regEx: SimpleSchema.RegEx.Id},
        marcaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({
        proveedorId, marcaId
    }) {
        if (Meteor.isServer) {
            return MarcasProveedores.update({proveedorId: proveedorId}, {
                $pull: {marcasId: marcaId}
            }), (err) => {
                if (err) {
                    throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
                }
            }
        }
    }
});

const DATOS_FISCALES_PROVEEDORES_METHODS = _.pluck(
    [
        actlizrMarcsProvdrs,
        borrarMarcaProveedor
    ],
    'name');
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