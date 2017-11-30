/**
 * Created by jvltmtz on 8/03/17.
 */
import {Mongo} from "meteor/mongo";
import proveedoresHooks from './proveedoresHooks';

class ProveedoresCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        proveedoresHooks.afterInsertProveedor(doc);
        return result;
    }

    update(selector, modifier, options, callback) {
        const result = super.update(selector, modifier, options, callback);
        return result;
    }
}

export const Proveedores = new ProveedoresCollection('proveedores');

Proveedores.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.proveedores = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    datosFiscalesId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    nombre: {
        type: String,
        regEx: /^[ñÑ\s\w]+$/,
        min: 2,
        max: 70,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }

    },
    telefonos: {
        type: [Object],
        optional: true,
        blackbox: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    activo: {
        type: Boolean,
        defaultValue: true
    },
    cuentaContable: {
        type: String,
        regEx: /^[0-9-]{12}$/
    },
    dias: {
        type: Number,
        optional: true
    },
    fechaCreacion: {
        type: Date, denyUpdate: true, autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    }
});

Proveedores.attachSchema(Schema.proveedores);