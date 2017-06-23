/**
 * Created by Héctor on 15/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Productos} from "./collection";

export const buscarProductos = new ValidatedMethod({
    name: 'productos.buscarProductos',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        marcaId: {type: String, optional: true},
        codigo: {type: String}
    }).validator(),
    run({marcaId, codigo}) {
        let selector = {campoBusqueda: {$regex: codigo, $options: 'i'}};
        if(marcaId){
           selector = {$and:[{marcaId: marcaId}, {campoBusqueda: {$regex: codigo, $options: 'i'}}]};
        }
        let options = {fields: {_id: 1, marcaId:1, campoBusqueda: 1}, limit: 10};
        const resultado = Productos.find(selector, options).fetch();
        return resultado;
    }
});

const BUSQUEDAS_PRODUCTOS_METHODS = _.pluck([buscarProductos], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_PRODUCTOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}

