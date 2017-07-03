/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Tiendas} from "./collection";
import {altaInventario} from "../../inventarios/methods";

const ID = ['_id'];

const CAMPO_CUENTA_CONTABLE = ['cuentaContable'];

const CAMPOS_TIENDAS = ['nombre', 'telefonos', 'telefonos.$', 'email'];

export const altaTienda = new ValidatedMethod({
    name: 'tiendas.altaTienda',
    mixins: [PermissionsMixin],
    allow: [
        {
            roles: ['crea_tien'],
            group: 'crudtiendas'
        }
    ],
    permissionsError: {
        name: 'tiendas.altaTienda',
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
                    altaInventario.call({tiendaId: result});
                });
            });
        }
    }
});

export const cambiosTienda = new ValidatedMethod({
    name: 'datosFiscales.cambiosTienda',
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
                throw new Meteor.Error(500, 'Error al realizar la operación. , llamar a soporte técnico: 55-6102-4884 | 55-2628-5121.', 'error-al-crear');
            }
        });
    }
});

export const cambiosTiendaCuentaContable = new ValidatedMethod({
    name: 'tiendas.cambiosTiendaCuentaContable',
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
            console.log('ESTO ES EL ERROR WE', err);
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación. , llamar a soporte técnico: 55-6102-4884 | 55-2628-5121.', 'error-al-crear');
            }
        });
    }
});

const TIENDAS_METHODS = _.pluck([altaTienda, cambiosTienda, cambiosTiendaCuentaContable], 'name');
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