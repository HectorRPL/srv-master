/**
 * Created by jvltmtz on 4/04/17.
 */
import {Mongo} from "meteor/mongo";
export const Empleados = new Mongo.Collection('empleados');

Empleados.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

Empleados.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true},
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase();
            }
        }
    },
    propietarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    departamentoId: {type: String},
    nombres: {
        type: String, max: 30, min: 2, regEx: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase();
            }
        }
    },
    apellidos: {
        type: String, max: 30, min: 2, regEx: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase();
            }
        }
    },
    nacimientoDia: {type: Number, max: 31, min: 1, regEx: /^[0-9]$/, optional: true},
    nacimientoMes: {type: Number, max: 12, min: 1, regEx: /^[0-9]$/, optional: true},
    nacimientoAnio: {type: Number, regEx: /^[0-9]$/, optional: true},
    sexo: {
        type: String, max: 6, min: 5, regEx: /^[a-zA-Z]/,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase();
            }
        }
    },
    telefono: {type: String, regEx: /^[0-9]{10}$/, min: 10, max: 10},
    celular: {type: String, regEx: /^[0-9]{10}$/, min: 10, max: 10},
    noEmpleado: {type: Number},
    nombreCompleto: {

        type: String,
        autoValue: function () {
            if (this.field('nombres').value && this.field('apellidos').value) {
                let nombreCompleto = '';
                nombreCompleto += this.field('nombres').value.toUpperCase();
                nombreCompleto += ' ' + this.field('apellidos').value.toUpperCase();
                return nombreCompleto;
            }
        }
    },
    activo: {
        type: Boolean,
        defaultValue: true
    },
});

Empleados.attachSchema(Empleados.schema);

