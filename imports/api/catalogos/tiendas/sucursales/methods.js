/**
 * Created by jvltmtz on 10/05/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Tiendas} from "../collection";
import {insertarInventario} from "../../../inventarios/methods";

const ID = ['_id'];

const CAMPOS_TIENDAS = ['nombre', 'telefonos', 'telefonos.$', 'email', 'tiendaMatrizId'];
// Enviará un correo con un link al usuario para verificacar de registro
export const crearSucursal = new ValidatedMethod({
    name: 'sucursales.crear',
    mixins: [PermissionsMixin],
    allow: [
        {
            roles: ['crea_tien'],
            group: 'crudtiendas'
        }
    ],
    permissionsError: {
        name: 'sucursales.crear',
        message: ()=> {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Tiendas.simpleSchema().pick(CAMPOS_TIENDAS).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefonos, email, tiendaMatrizId}) {
        return Tiendas.insert({nombre, telefonos, email, tiendaMatrizId}, ()=>{

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