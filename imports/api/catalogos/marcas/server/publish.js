/**
 * Created by jvltmtz on 9/03/17.
 */
import {Meteor} from "meteor/meteor";
import {Marcas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('marcas.todas', function () {

        return Marcas.find();
    });

}