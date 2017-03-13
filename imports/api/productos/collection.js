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
    marcaId:            {type: String,  optional: true, regEx: SimpleSchema.RegEx.Id},
    tipoProductoId:     {type: String,  optional: true, regEx: SimpleSchema.RegEx.Id},
    claveProveedor:     {type: String,  optional: true},
    claveEmpresa:       {type: String,  optional: true},
    activo:             {type: Boolean,  optional: true},
    nombre:             {type: String,  optional: true},
    color:              {type: String,  optional: true},
    importado:          {type: Boolean, optional: true},
    rectificado:        {type: Boolean, optional: true},
    calidad:            {type: String,  optional: true},
    caracteristicas:    {type: Object,  blackbox: true},
    // ancho:              {type: Number,  optional: true}, // No sé aún como ingresar estas propiedades dentro del objeto {caracteristicas}
    // largo:              {type: Number,  optional: true}, // No sé aún como ingresar estas propiedades dentro del objeto {caracteristicas}
    // metrosCuadrados:    {type: Number,  optional: true}  // No sé aún como ingresar estas propiedades dentro del objeto {caracteristicas}
});

Productos.attachSchema(Productos.schema);