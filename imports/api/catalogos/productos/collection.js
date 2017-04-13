/**
 * Created by Héctor on 09/03/2017.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Productos = new Mongo.Collection('productos');

Productos.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});


Productos.schema = new SimpleSchema({
    _id:                {type: String,  regEx: SimpleSchema.RegEx.Id},
    fechaCreacion:      {type: Date,    defaultValue: new Date(), denyUpdate: true},
    marcaId:            {type: String,  regEx: SimpleSchema.RegEx.Id},
    codigoProveedor:    {type: String},
    campoBusqueda:      {type: String},
    descripcionDos:     {type: String},
    tipoProductoId:     {type: String,  optional:true},
    descontinuado:      {type: Boolean, defaultValue: false},
    linea:              {type: String,  optional:true},
    nombre:             {type: String,  optional:true},
    color:              {type: String,  optional:true},
    importado:          {type: Boolean, defaultValue: false},
    calidad:            {type: Number,  defaultValue: 1},
    undidad:            {type:String, defaultValue: 'PZA'},
    rectificado:        {type: Boolean, optional: true},
    metrosCuadrados:    {type: Number, optional:true, decimal: true},
    costoDefault:       {type: Number,  decimal: true}
});

Productos.attachSchema(Productos.schema);