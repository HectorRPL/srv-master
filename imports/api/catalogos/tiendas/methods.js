/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Tiendas} from "./collection";
import {insertarTiendaEnInventarios} from "../../inventarios/methods";

const ID = ['_id'];

const CAMPOS_TIENDAS = ['nombre', 'telefonos', 'telefonos.$', 'email'];
// Enviará un correo con un link al usuario para verificacar de registro
export const insertar = new ValidatedMethod({
    name: 'tiendas.insertar',
    validate: Tiendas.simpleSchema().pick(CAMPOS_TIENDAS).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefonos, email}) {
        if (Meteor.isServer) {
            return Tiendas.insert({nombre, telefonos, email}, (err, result) => {
                if (err) {
                    throw err;
                }
                Meteor.defer(() => {
                    insertarTiendaEnInventarios.call({tiendaId: result});
                });
            });
        }
    }
});

const TIENDAS_METHODS = _.pluck([insertar], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(TIENDAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}