/**
 * Created by Héctor on 15/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {_} from "meteor/underscore";
import {ProductosInventarios} from "./collection";

const CAMPOS_PRODUCTOS_INVENTARIOS = [
    '_id',
    'inventarioId',
    'tiendaId',
    'productoId',
    'marcaId',
    'factorId',
    'fechaCreacion',
    'cantidad',
    'costo',
];

const CAMPOS_APLICAR_FACTOR = [
    'tiendaId',
    'productoId',
    'marcaId',
    'factorId'
];

const ID = ['_id'];

const CAMPO_CANTIDAD = ['cantidad'];


export const cambioFactorProducto = new ValidatedMethod({
    name: 'productosInventarios.cambioFactorProducto',
    validate: ProductosInventarios.simpleSchema().pick(CAMPOS_APLICAR_FACTOR).validator({
        clean: true,
        filter: false
    }),
    run({
        tiendaId,
        productoId,
        marcaId,
        factorId

    }) {
        console.log('llegó aquí');
        if (Meteor.isServer) {
            return ProductosInventarios.update(
                {
                    tiendaId: tiendaId,
                    productoId: productoId,
                    marcaId: marcaId,
                },
                {
                    $set: {
                        factorId
                    }
                }
            );
        }
    }
});

export const cambiosExistenciaProducto = new ValidatedMethod({
    name: 'productosInventarios.cambiosExistenciaProducto',
    mixins: [CallPromiseMixin],
    validate: ProductosInventarios.simpleSchema().pick(CAMPO_CANTIDAD, ID).validator({
        clean: true,
        filter: false
    }),
    run({
        _id,
        cantidad
    }) {
        if (Meteor.isServer) {
            return ProductosInventarios.update({_id: _id}, {
                $set: {
                    cantidad
                }
            }, (err) => {
                if (err) {
                    console.log(err);
                    throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
                }
            });
        }
    }
});

const PRODUCTOS_INVENTARIOS_METHODS = _.pluck([cambioFactorProducto, cambiosExistenciaProducto], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(PRODUCTOS_INVENTARIOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}