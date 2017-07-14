/**
 * Created by jvltmtz on 7/07/17.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
const DIA_MILISEG = 86400000;
export const Promociones = new Mongo.Collection('promociones');

Promociones.deny({
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

Promociones.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    nombre: {
        type: String, autoValue: function () {
            return this.value.toUpperCase()
        }
    },
    descuento: {type: Number},
    precioLista: {type: Boolean, defaultValue: false},
    fechaCreacion: {type: Date, defaultValue: new Date(), denyUpdate: true},
    fechaInicio: {
        type: Date, autoValue: function () {
            let dia = this.value.getDate();
            let mes = this.value.getMonth();
            let anio = this.value.getFullYear();
            let fechaIni = new Date();
            fechaIni.setDate(dia);
            fechaIni.setMonth(mes);
            fechaIni.setFullYear(anio);
            fechaIni.setHours(0, 0, 0, 0);
            return fechaIni;
        }
    },
    fechaFin: {
        type: Date, autoValue: function () {
            let dia = this.value.getDate();
            let mes = this.value.getMonth();
            let anio = this.value.getFullYear();
            let fechaFin = new Date();
            fechaFin.setDate(dia);
            fechaFin.setMonth(mes);
            fechaFin.setFullYear(anio);
            fechaFin.setHours(22, 0, 0, 0);
            return fechaFin;
        }
    }
});

Promociones.attachSchema(Promociones.schema);