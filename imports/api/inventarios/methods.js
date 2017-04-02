/**
 * Created by Héctor on 30/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Inventarios} from "./collection";

const ID = ['_id'];

const CAMPOS_INVENTARIOS = [
    'tiendaId',
    'ultimaOrdenCompra',
    'actualizacion'
];

export const insertarTiendaEnInventarios = new ValidatedMethod({
    name: 'marcas.insertarTiendaEnInventarios',
    validate: Inventarios.simpleSchema().pick(CAMPOS_INVENTARIOS).validator({
        clean: true,
        filter: false
    }),
    run({
        tiendaId,
        ultimaOrdenCompra,
        actualizacion
    }) {
        return Inventarios.insert({
            tiendaId,
            ultimaOrdenCompra,
            actualizacion
        });
    }
});

const INVENTARIOS_METHODS = _.pluck([insertarTiendaEnInventarios], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(INVENTARIOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}