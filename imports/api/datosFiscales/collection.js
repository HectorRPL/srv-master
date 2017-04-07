/**
 * Created by jvltmtz on 25/03/17.
 */

import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
export const DatosFiscales = new Mongo.Collection('datosFiscales');

DatosFiscales.deny({
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

const Schema = {};

Schema.datosFiscales = new SimpleSchema({
    _id:            {type: String,                  regEx: SimpleSchema.RegEx.Id },
    proveedorId:    {type: String,                  regEx: SimpleSchema.RegEx.Id },
    razonSocial:    {type: String /*                regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/ */},
    email:          {type: String, regEx: SimpleSchema.RegEx.Email},
    rfc:            {type: String },
    fechaCreacion:  {type: Date, defaultValue: new Date(), denyUpdate: true },
    calle:          {type: String, max: 30,  min: 1, regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/},
    delMpio:        {type: String, max: 100, min: 1, },
    estado:         {type: String, max: 20,  min: 1, },
    estadoId:       {type: String, max: 3,   min: 1, regEx: /^[a-zA-Z-/.&ñáéíóú-\s\d]+$/},
    colonia:        {type: String, max: 100, min: 1, },
    codigoPostal:   {type: String, max: 5,   min: 5, regEx: /^[0-9]{5}$/},
    numExt:         {type: String, max: 10,  min: 1, regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/},
    numInt:         {type: String, max: 20,  min: 1, regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/, optional: true},
    // codigoPais:     {type: String }, // se deja pendiente, pero deberá estar
    personaFisica:  {type: Boolean, defaultValue: false },
    curp:           {type: String, optional: true, }
});

DatosFiscales.attachSchema(Schema.datosFiscales);
