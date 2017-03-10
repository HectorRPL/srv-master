/**
 * Created by Héctor on 09/03/2017.
 */
import {Meteor} from "meteor/meteor";
import {TiposProductos} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('tiposProductos.todo', function () {
        return TiposProductos.find();
    });
}