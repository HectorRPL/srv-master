/**
 * Created by Héctor on 09/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {Productos} from "../collection";
import {TiposProductos} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('productos.todo', () => {
        return Productos.find();
    });
    //
    // Meteor.publish('tiposProductos.todo', () => {
    //     return TiposProductos.find(this.tipoProductoId);
    // });

}
