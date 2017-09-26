/**
 * Created by jvltmtz on 30/03/17.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method"
import {PermissionsMixin} from "meteor/didericis:permissions-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {_} from "meteor/underscore";
import {Factores} from "./collection";
import {ProductosInventarios} from "../inventarios/productosInventarios/collection";
import {BitaFactPromoComi} from "../bitacoras/factoresPromo/collection";

const CAMPOS_FACTORES = ['nombre', 'factor1', 'factor2', 'factor3', 'factor4', 'factor5', 'factor6', 'factor7', 'factor8', 'factor9'];
const CAMPO_ID = ['_id'];

export const crearFactor = new ValidatedMethod({
    name: 'factores.crearFactor',
    mixins: [CallPromiseMixin],
    validate: Factores.simpleSchema().pick(CAMPOS_FACTORES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, factor9}) {
        return Factores.insert({nombre, factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, factor9}, (err)=> {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

export const actualizarFactor = new ValidatedMethod({
    name: 'factores.actualizarFactor',
    mixins: [CallPromiseMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Factores.simpleSchema().pick(CAMPO_ID, CAMPOS_FACTORES).validator({
        clean: true,
        filter: false
    }),
    run({_id, nombre, factor1, factor2, factor3, factor4, factor5, factor6, factor7, factor8, factor9}) {

        return Factores.update({
            _id: _id
        }, {
            $set: {
                nombre: nombre,
                factor1: factor1,
                factor2: factor2,
                factor3: factor3,
                factor4: factor4,
                factor5: factor5,
                factor6: factor6,
                factor7: factor7,
                factor8: factor8,
                factor9: factor9
            }
        }, (err)=> {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});



const FACTORES_METHODS = _.pluck([crearFactor, actualizarFactor], 'name');
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