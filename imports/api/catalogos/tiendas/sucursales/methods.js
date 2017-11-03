/**
 * Created by jvltmtz on 10/05/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Tiendas} from "../collection";
import {crearInventario} from "../../../inventarios/methods";

const ID = ['_id'];

const CAMPOS_TIENDAS = ['nombre', 'telefonos', 'telefonos.$', 'email', 'tiendaMatrizId'];

export const crearSucursal = new ValidatedMethod({
    name: 'sucursales.crearSucursal',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_tiendas'],
            group: 'tiendas'
        }
    ],
    permissionsError: {
        name: 'sucursales.crearSucursal',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Tiendas.simpleSchema().pick(CAMPOS_TIENDAS).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefonos, email, tiendaMatrizId}) {
        return Tiendas.insert({nombre, telefonos, email, tiendaMatrizId}, () => {

        }, (err) => {
            if (err) {
                console.log('[41]', err);
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
            Meteor.defer(() => {
                crearInventario.call({tiendaId: result});
            });
        });

    }
});

const TIENDAS_METHODS = _.pluck([crearSucursal], 'name');
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