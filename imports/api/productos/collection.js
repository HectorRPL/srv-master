/**
 * Created by Héctor on 09/03/2017.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Productos = new Mongo.Collection('productos', {});

Productos.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});


Productos.schema = new SimpleSchema({
    _id:                {type: String,  regEx: SimpleSchema.RegEx.Id},
    fechaCreacion:      {type: Date,    defaultValue: new Date(), denyUpdate: true},
    marcaId:            {type: String,  regEx: SimpleSchema.RegEx.Id},
    tipoProductoId:     {type: String,  defaultValue: ''},
    codigoProveedor:    {type: String   },
    activo:             {type: Boolean, defaultValue: true},
    linea:              {type: String,  defaultValue: ''},
    costoUnitario:      {type: Number,  decimal: true},
    nombre:             {type: String,  optional: true   },
    color:              {type: String,  defaultValue: ''},
    importado:          {type: Boolean, defaultValue: false},
    calidad:            {type: Number,  defaultValue: 1},
    descripcion:        {type: String},
    descripcionDos:     {type: String}
});

Productos.attachSchema(Productos.schema);