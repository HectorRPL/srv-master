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

export const insertarInventario = new ValidatedMethod({
    name: 'marcas.insertarInventario',
    validate: new SimpleSchema({
        tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({tiendaId}) {
        if(Meteor.isServer){
            Inventarios.insert({tiendaId}, (err, result)=>{
                if(result){
                    ProdsInvntariosUtils.generarInventarioInicial(result, tiendaId);
                }
            });
        }

    }
});

const INVENTARIOS_METHODS = _.pluck([insertarInventario], 'name');
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