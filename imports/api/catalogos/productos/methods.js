/**
 * Created by Héctor on 12/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Productos} from "./collection";

const CAMPOS_PRODUCTOS = [
    'marcaId',
    'tipoProductoId',
    'claveProveedor',
    'claveEmpresa',
    'activo',
    'importado',
    'nombre',
    'color',
    'ancho',
    'largo',
    'calidad',
    'caracteristicas',
    'rectificado',
    'metrosCuadrados'
];

export const crearProducto = new ValidatedMethod({
    name: 'productos.crearProducto',
    mixins: [PermissionsMixin, CallPromiseMixin],
    allow: [
        {
            roles: ['crea_productos'],
            group: 'productos'
        }
    ],
    permissionsError: {
        name: 'productos.crearProducto',
        message: () => {
            return 'Usuario no autorizado, no tienen los permisos necesarios.';
        }
    },
    validate: Productos.simpleSchema().pick(CAMPOS_PRODUCTOS).validator({
        clean: true,
        filter: false
    }),
    run({
        marcaId,
        tipoProductoId,
        claveProveedor,
        claveEmpresa,
        activo,
        importado,
        nombre,
        color,
        ancho,
        largo,
        calidad,
        caracteristicas,
        rectificado,
        metrosCuadrados
    }) {
        return Productos.insert({
            marcaId,
            tipoProductoId,
            claveProveedor,
            claveEmpresa,
            activo,
            importado,
            nombre,
            color,
            caracteristicas,
            ancho,
            largo,
            calidad,
            rectificado,
            metrosCuadrados
        });
    }
});

const PRODUCTOS_METHODS = _.pluck([crearProducto], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(PRODUCTOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
