/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {Marcas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('marcas.todas', function () {

        return Marcas.find();
    });

    Meteor.publish('marcas.nombre', function (nombre) {
        console.log('marcas.nombre', nombre);
        if (nombre.nombre) {
            const selector = {nombre: {$regex: nombre.nombre, $options : 'i'}};
            console.log(selector);
            return Marcas.find(selector);
        }else{
            this.ready();
        }


    });

}