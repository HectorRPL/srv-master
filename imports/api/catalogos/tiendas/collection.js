/**
 * Created by jvltmtz on 9/03/17.
 */
import {Mongo} from "meteor/mongo";
import tiendasHooks from './tiendasHooks';

class TiendasCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        tiendasHooks.afterInsertTiendas(doc);
        return result;
    }
}

export const Tiendas = new TiendasCollection('tiendas');

Tiendas.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.tiendas = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    datosFiscalesId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true
    },
    nombre: {
        type: String,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        min: 2,
        max: 50,
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
        regEx: /^[0-9-]{12}$/,
        optional: true
    },
    tiendaMatrizId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});

Tiendas.attachSchema(Schema.tiendas);