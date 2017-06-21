/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {Empleados} from "../collection";

if (Meteor.isServer) {
    // Trae t.o.d.o. el inventario
    Meteor.publish('empleados.porTienda', function (tiendaId) {
        return Empleados.find(tiendaId);
    });

}