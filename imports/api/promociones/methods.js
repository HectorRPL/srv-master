/**
 * Created by jvltmtz on 7/07/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method"
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {_} from "meteor/underscore";
import {Promociones} from "./collection";
import {BitaFactPromoComi} from "../bitacoras/factoresPromo/collection";
import {ProductosInventarios} from "../inventarios/productosInventarios/collection";

const CAMPOS_PROMOCIONES = ['nombre', 'descuento', 'precioLista', 'fechaInicio', 'fechaFin'];

const CAMPO_ID = ['_id'];


export const crearPromocion = new ValidatedMethod({
    name: 'promociones.crearPromocion',
    mixins: [CallPromiseMixin],
    validate: Promociones.simpleSchema().pick(CAMPOS_PROMOCIONES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, descuento, precioLista, fechaInicio, fechaFin}) {
        return Promociones.insert({nombre, descuento, precioLista, fechaInicio, fechaFin}, (err)=> {
            if (err) {
                throw  new Meteor.Error(500, "Error al realizar ala operación", "insertar-promo");
            }
        });
    }
});

export const actualizarPromocion = new ValidatedMethod({
    name: 'promociones.actualizarPromocion',
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Promociones.simpleSchema().pick(CAMPO_ID, CAMPOS_PROMOCIONES).validator({
        clean: true,
        filter: false
    }),
    run({_id, nombre, descuento, precioLista, fechaInicio, fechaFin,
    }) {
        return Promociones.update({
            _id: _id
        }, {
            $set: {nombre: nombre, descuento: descuento, precioLista: precioLista, fechaInicio: fechaInicio, fechaFin: fechaFin}
        },(err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-cambiar');
            }
        });
    }
});

export const aplicarPromocionProductos = new ValidatedMethod({
    name: 'promociones.aplicarProductos',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        promocionNuevaId: {type: String},
        productos: {type: [Object], blackbox: true}
    }).validator(),
    run({promocionNuevaId, productos}) {
        let result = [];
        let error = [];
        productos.forEach((prod)=> {
            ProductosInventarios.update({_id: prod._id}, {$set: {promocionId: promocionNuevaId}}, (err)=> {
                if (err) {
                    error.push({_id: prod._id});
                } else {
                    result.push({_id: prod._id})
                }
            });
        });
        if (result.length === 0) {
            throw Meteor.Error('404', 'Erro al realizar la operacion.', 'erro-aplicar-promo');
        }
        return result;
    }
});

export const aplicarPromocionMarca = new ValidatedMethod({
    name: 'promociones.aplicarMarca',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        tiendaId: {type: String},
        marcaId: {type: String},
        promocionNuevaId: {type: String},
        excepciones: {type: [Object], blackbox: true}
    }).validator(),
    run({tiendaId, marcaId, promocionNuevaId, excepciones}) {
        if (Meteor.isServer) {
            let arrIds = [];
            excepciones.forEach((prod)=> {
                arrIds.push(prod._id);
            });
            let prodInventariosBulk = ProductosInventarios.rawCollection().initializeUnorderedBulkOp();
            const selector = {
                $and: [
                    {_id: {$nin: arrIds}},
                    {tiendaId: tiendaId},
                    {marcaId: marcaId}
                ]
            };
            prodInventariosBulk.find(selector).update({$set: {promocionId: promocionNuevaId}});
            const execute = Meteor.wrapAsync(prodInventariosBulk.execute, prodInventariosBulk);
            try {
                execute();
                BitaFactPromoComi.insert({usuarioId: this.userId, nuevoValorId:promocionNuevaId,
                    operacion: 'promocionMarca', marcaId: marcaId, excepciones: arrIds});
                return true;
            } catch (error) {
                console.log(error);
                throw new Meteor.Error(403, 'Error al aplicar factor', 'error.aplicar-promocion');
            }

        }
    }
});


const PROMOCIONES_METHODS = _.pluck([crearPromocion, actualizarPromocion, aplicarPromocionProductos, aplicarPromocionMarca], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(PROMOCIONES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}