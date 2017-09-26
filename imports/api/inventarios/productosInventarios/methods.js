/**
 * Created by Héctor on 15/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {_} from "meteor/underscore";
import {ProductosInventarios} from "./collection";
import {BitaFactPromoComi} from "../../bitacoras/factoresPromo/collection";

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

const ID = ['_id'];

const CAMPO_CANTIDAD = ['cantidad'];


export const aplicarFactPromoComiProd = new ValidatedMethod({
    name: 'productosInventarios.aplicarFactPromoComiProd',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        nuevoValorId: {type: String},
        productos: {type: [Object],  blackbox: true},
        operacion: {type: String}
    }).validator(),
    run({nuevoValorId, productos, operacion}) {
        if (Meteor.isServer) {
            let arrIds = [];
            productos.forEach((prod)=> {
                arrIds.push(prod._id);
            });

            const selector = {_id: {$in: arrIds}};
            let campoActualizar = {};
            if(operacion.includes('promocion')){
                campoActualizar = {promocionId: nuevoValorId}
            } else if(operacion.includes('factor')){
                campoActualizar = {factorId: nuevoValorId}
            }else {
                campoActualizar = {comisionId: nuevoValorId}
            }
            console.log('', campoActualizar);

            let prodInventariosBulk = ProductosInventarios.rawCollection().initializeUnorderedBulkOp();
            prodInventariosBulk.find(selector).update({$set: campoActualizar});
            const execute = Meteor.wrapAsync(prodInventariosBulk.execute, prodInventariosBulk);
            try {
                execute();
                BitaFactPromoComi.insert({usuarioId: this.userId, nuevoValorId:nuevoValorId, operacion: operacion,
                    productos: arrIds});
                return true;
            } catch (error) {
                console.log(error);
                throw new Meteor.Error(403, 'Error al aplicar factor', 'error.aplicar-factor');
            }
        }
    }
});

export const aplicarFactPromoComiMarca = new ValidatedMethod({
    name: 'productosInventarios.aplicarFactPromoComiMarca',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        tiendaId: {type: String},
        marcaId: {type: String},
        nuevoValorId: {type: String},
        excepciones: {type: [Object],  blackbox: true},
        operacion: {type: String}
    }).validator(),
    run({tiendaId, marcaId, nuevoValorId, excepciones, operacion}) {
        if (Meteor.isServer) {
            let arrIds = [];
            excepciones.forEach((prod)=> {
                arrIds.push(prod._id);
            });

            const selector = {
                $and: [
                    {_id: {$nin: arrIds}},
                    {tiendaId: tiendaId},
                    {marcaId: marcaId}
                ]
            };
            let campoActualizar = {};
            if(operacion.includes('promocion')){
                campoActualizar = {promocionId: nuevoValorId}
            } else if(operacion.includes('factor')){
                campoActualizar = {factorId: nuevoValorId}
            }else {
                campoActualizar = {comisionId: nuevoValorId}
            }

            let prodInventariosBulk = ProductosInventarios.rawCollection().initializeUnorderedBulkOp();
            prodInventariosBulk.find(selector).update({$set: campoActualizar});
            const execute = Meteor.wrapAsync(prodInventariosBulk.execute, prodInventariosBulk);
            try {
                execute();
                BitaFactPromoComi.insert({usuarioId: this.userId, nuevoValorId:nuevoValorId, operacion: operacion,
                    marcaId: marcaId, excepciones: arrIds});
                return true;
            } catch (error) {
                console.log(error);
                throw new Meteor.Error(403, 'Error al aplicar factor', 'error.aplicar-factor');
            }
        }
    }
});


export const actlzrExstncProdct = new ValidatedMethod({
    name: 'productosInventarios.actlzrExstncProdct',
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

const PRODUCTOS_INVENTARIOS_METHODS = _.pluck([aplicarFactPromoComiMarca, aplicarFactPromoComiProd, actlzrExstncProdct], 'name');
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