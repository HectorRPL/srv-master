/**
 * Created by jvltmtz on 30/03/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {_} from "meteor/underscore";
import {Factores} from "./collection";

const CAMPOS_FACTORES = [ 'nombre', 'factor1', 'factor2', 'factor3', 'factor4', 'factor5', 'factor6', 'factor7', 'factor8', 'factor9'];

export const insertarFactor = new ValidatedMethod({
    name: 'factores.insertarFactor',
    validate: Factores.simpleSchema().pick(CAMPOS_FACTORES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, factor9}) {
        return Factores.insert({nombre, factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, factor9});
    }
});

export const obtenerFactores = new ValidatedMethod({
    name: 'factores.obtenerFactores',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        factor: {type: String}
    }).validator(),
    run({factor}) {
        const selector = {nombre: {$regex: factor, $options: 'i'}};
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Factores.find(selector, options).fetch();
        return resultado;
    }
});

const FACTORES_METHODS = _.pluck([insertarFactor], 'name');
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