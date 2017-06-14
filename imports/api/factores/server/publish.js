/**
 * Created by Héctor on 13/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {Factores} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('factores.todos', () => {
        return Factores.find();
    });
}