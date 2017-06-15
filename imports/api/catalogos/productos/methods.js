/**
 * Created by Héctor on 12/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
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

export const insertar = new ValidatedMethod({
    name: 'productos.insertar',
    mixins: [PermissionsMixin],
    allow: PermissionsMixin.LoggedIn,
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

export const obtenerProducto = new ValidatedMethod({
    name: 'marcas.obtenerProducto',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        marcaId: {type: String},
        codigo: {type: String}
    }).validator(),
    run({marcaId, codigo}) {
        const selector = {
            $and: [
                {marcaId: marcaId},
                {campoBusqueda: {$regex: codigo, $options: 'i'}}
            ]
        };

        let options = {fields: {_id: 1, campoBusqueda: 1}};
        const resultado = Productos.find(selector, options).fetch();
        return resultado;
    }
});

const INSERTAR_PRODUCTOS_METHODS = _.pluck([insertar, obtenerProducto], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(INSERTAR_PRODUCTOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
