/**
 * Created by Héctor on 02/08/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {_} from "meteor/underscore";
import {Promociones} from "./collection";

export const buscarPromociones = new ValidatedMethod({
    name: 'promociones.buscarPromociones',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        promocion: {type: String}
    }).validator(),
    run({promocion}) {
        const selector = {nombre: {$regex: promocion, $options: 'i'}};
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Promociones.find(selector, options).fetch();
        return resultado;
    }
});

const BUSQUEDAS_PROMOCIONES_METHODS = _.pluck([buscarPromociones], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BUSQUEDAS_PROMOCIONES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
