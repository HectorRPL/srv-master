/**
 * Created by jvltmtz on 30/03/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method"
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {_} from "meteor/underscore";
import {Factores} from "./collection";
import {ProductosInventarios} from "../inventarios/productosInventarios/collection";
import {BitaFactoresPromo} from "../bitacoras/factoresPromo/collection";

const CAMPOS_FACTORES = ['nombre', 'factor1', 'factor2', 'factor3', 'factor4', 'factor5', 'factor6', 'factor7', 'factor8', 'factor9'];

export const altaFactor = new ValidatedMethod({
    name: 'factores.altaFactor',
    validate: Factores.simpleSchema().pick(CAMPOS_FACTORES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, factor9}) {
        return Factores.insert({
            nombre,
            factor1,
            factor2,
            factor3,
            factor4,
            factor5,
            factor6,
            factor7,
            factor8,
            factor9
        });
    }
});

export const aplicarFactorProductos = new ValidatedMethod({
    name: 'factores.aplicarProductos',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        factorNuevoId: {type: String},
        productos: {type: [Object],  blackbox: true}
    }).validator(),
    run({factorNuevoId, productos}) {
        console.log('Dentro del metodo', factorNuevoId, productos);
        let result = [];
        let error = [];
        productos.forEach((prod)=> {
            ProductosInventarios.update({_id: prod._id}, {$set: {factorId: factorNuevoId}}, (err)=> {
                if (err) {
                    error.push({_id: prod._id});
                } else{
                    result.push({_id: prod._id})
                }
            });
        });
        if(result.length === 0){
            throw Meteor.Error('404', 'Erro al realizar la operacion.', 'erro-aplicar-factor');
        }
        return result;
    }
});

export const aplicarFactorMarca = new ValidatedMethod({
    name: 'factores.aplicarMarca',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        tiendaId: {type: String},
        marcaId: {type: String},
        factorNuevoId: {type: String},
        excepciones: {type: [Object],  blackbox: true}
    }).validator(),
    run({tiendaId, marcaId, factorNuevoId, excepciones}) {
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
            prodInventariosBulk.find(selector).update({$set: {factorId: factorNuevoId}});
            const execute = Meteor.wrapAsync(prodInventariosBulk.execute, prodInventariosBulk);
            try {
                execute();
                BitaFactoresPromo.insert({usuarioId: this.userId, operacion: 'aplica-factor',
                    marcaId: marcaId, excepciones: arrIds});
                return true;
            } catch (error) {
                throw new Meteor.Error(403, 'Error al aplicar factor', 'error.aplicar-factor');
            }
        }
    }
});


const FACTORES_METHODS = _.pluck([altaFactor, aplicarFactorProductos, aplicarFactorMarca], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(FACTORES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}