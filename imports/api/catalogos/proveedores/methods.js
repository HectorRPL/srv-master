/**
 * Created by jvltmtz on 8/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Proveedores} from "./collection";


const ID = ['_id'];
const CAMPOS_PROVEEDORES = ['nombre', 'telefonos', 'telefonos.$', 'email'];
const CAMPO_CUENTA_CONTABLE = ['cuentaContable'];

export const altaProveedor = new ValidatedMethod({
    name: 'proveedores.altaProveedor',
    validate: Proveedores.simpleSchema().pick(CAMPOS_PROVEEDORES, CAMPO_CUENTA_CONTABLE).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefonos, email, cuentaContable}) {
        return Proveedores.insert({nombre, telefonos, email, cuentaContable});
    }
});

export const cambiosProveedor = new ValidatedMethod({
    name: 'proveedores.cambiosProveedor',
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
                throw new Meteor.Error(500, 'Error al realizar la operación. , llamar a soporte técnico: 55-6102-4884 | 55-2628-5121.', 'error-al-crear');
            }
        });
    }
});

export const cambiosCuentaContable = new ValidatedMethod({
    name: 'proveedores.cambiosCuentaContable',
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
                throw new Meteor.Error(500, 'Error al realizar la operación. , llamar a soporte técnico: 55-6102-4884 | 55-2628-5121.', 'error-al-crear');
            }
        });
    }
});



const PROVEEDORES_METHODS = _.pluck([altaProveedor, cambiosProveedor, cambiosCuentaContable], 'name');
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