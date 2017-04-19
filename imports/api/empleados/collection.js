/**
 * Created by jvltmtz on 4/04/17.
 */
import {Mongo} from "meteor/mongo";
export const Empleados = new Mongo.Collection('empleados');

Empleados.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

Empleados.schema = new SimpleSchema({
    _id:                {type: String, regEx: SimpleSchema.RegEx.Id},
    fechaCreacion:      {type: Date,   defaultValue: new Date(), denyUpdate: true},
    propietarioId:      {type: String, regEx: SimpleSchema.RegEx.Id},
    tiendaId:           {type: String, regEx: SimpleSchema.RegEx.Id},
    departamentoId:     {type: String },
    nombre:             {type: String, max: 30, min: 2, regEx: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/},
    apellidos:          {type: String, max: 30, min: 2, regEx: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/},
    nacimientoDia:      {type: Number, max: 31, min: 1, regEx: /^[0-9]$/, optional: true},
    nacimientoMes:      {type: Number, max: 12, min: 1, regEx: /^[0-9]$/, optional: true},
    nacimientoAnio:     {type: Number, regEx: /^[0-9]$/, optional: true},
    sexo:               {type: String, max: 6, min: 5, regEx: /^[a-zA-Z]/},
    telefono:           {type: String, regEx: /^[0-9]{10}$/, min: 10, max: 10},
    celular:            {type: String, regEx: /^[0-9]{10}$/, min: 10, max: 10},
    noEmpleado:         {type: Number }
});

Empleados.attachSchema(Empleados.schema);

