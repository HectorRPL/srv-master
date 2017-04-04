/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method"
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";

const ID = ['_id'];

export const insertar = new ValidatedMethod({
    name: 'usuarios.insertar',
    validate: new SimpleSchema({
        password: {type: String},
        username: {type: String},
        profile: {type: Object, blackbox: true},
    }).validator(),
    run({password, username, profile}) {

        if (Meteor.isServer) {
            Accounts.createUser({password, username, profile},
                (err) => {
                    if (err) {
                        throw  err;
                    }
                }
            );
        }
    }
});


const USUARIOS_METHODS = _.pluck([insertar], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(USUARIOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}