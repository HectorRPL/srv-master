/**
 * Created by Héctor on 15/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Productos} from "./collection";

export const buscarProducto = new ValidatedMethod({
    name: 'marcas.buscarProducto',
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

const BUSQUEDAS_PRODUCTOS_METHODS = _.pluck([buscarProducto], 'name');
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

