/**
 * Created by Héctor on 24/07/2017.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method"
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {_} from "meteor/underscore";
import {Comisiones} from "./collection";
import {BitaFactPromoComi} from "../bitacoras/factoresPromo/collection";

const CAMPOS_COMISIONES = ['nombre', 'comision'];
const CAMPO_ID = ['_id'];

export const altaComision = new ValidatedMethod({
    name: 'comisiones.altaComision',
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Comisiones.simpleSchema().pick(CAMPOS_COMISIONES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, comision}) {
        return Comisiones.insert({
            nombre,
            comision
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

export const cambiosComisiones = new ValidatedMethod({
    name: 'comisiones.cambiosComisiones',
    mixins: [LoggedInMixin, CallPromiseMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Comisiones.simpleSchema().pick(CAMPO_ID, CAMPOS_COMISIONES).validator({
        clean: true,
        filter: false
    }),
    run({
        _id,
        nombre,
        comision
    }) {
        return Comisiones.update({
            _id: _id
        }, {
            $set: {
                nombre: nombre,
                comision1: comision
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(500, 'Error al realizar la operación.', 'error-al-crear');
            }
        });
    }
});

const COMISIONES_METHODS = _.pluck([altaComision, cambiosComisiones], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(COMISIONES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}