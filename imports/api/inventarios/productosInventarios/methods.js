/**
 * Created by Héctor on 15/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
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

const PRODUCTOS_INVENTARIOS_METHODS = _.pluck([cambioFactorProducto], 'name');
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