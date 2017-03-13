/**
 * Created by Héctor on 12/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
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
        metrosCuadrados}) {
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

const TIENDAS_METHODS = _.pluck([insertar], 'name');
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
