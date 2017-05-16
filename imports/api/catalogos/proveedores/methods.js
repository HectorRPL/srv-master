/**
 * Created by jvltmtz on 8/03/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Proveedores} from "./collection";

const ID = ['_id'];

const CAMPOS_PROVEEDORES = ['nombre', 'telefonos', 'telefonos.$', 'email'];
// Enviará un correo con un link al usuario para verificacar de registro
export const insertar = new ValidatedMethod({
    name: 'proveedores.insertar',
    validate: Proveedores.simpleSchema().pick(CAMPOS_PROVEEDORES).validator({
        clean: true,
        filter: false
    }),
    run({nombre, telefonos, email}) {
        console.log(nombre, telefonos, email);
        return Proveedores.insert({nombre, telefonos, email});
    }
});

export const buscarProveedor = new ValidatedMethod({
    name: 'proveedores.buscarProveedor',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        nombre: {type: String}
    }).validator(),
    run({nombre}) {
        const partialMatch = new RegExp(`^${nombre}`, 'i');
        const selector = {nombre: {$regex: partialMatch}};
        console.log(selector);
        let options = {fields: {_id: 1, nombre: 1}};
        const resultado = Proveedores.find(selector, options).fetch();

        return resultado;
    }
});

const PROVEEDORES_METHODS = _.pluck([insertar, buscarProveedor], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(PROVEEDORES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}