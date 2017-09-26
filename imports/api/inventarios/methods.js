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

export const crearInventario = new ValidatedMethod({
    name: 'inventarios.crearInventario',
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({tiendaId}) {
        if (Meteor.isServer) {
            Inventarios.insert({tiendaId});
        }

    }
});

export const crearInventarioMarca = new ValidatedMethod({
    name: 'inventarios.crearInventarioMarca',
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
        marcaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({tiendaId, marcaId}) {
        if (Meteor.isServer) {
            ProdsInvntariosUtils.generarInventarioMarca(tiendaId, marcaId);
        }

    }
});

const INVENTARIOS_METHODS = _.pluck([crearInventario, crearInventarioMarca], 'name');
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