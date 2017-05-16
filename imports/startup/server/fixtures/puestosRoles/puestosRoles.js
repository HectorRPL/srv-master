/**
 * Created by jvltmtz on 15/05/17.
 */

import {Meteor} from "meteor/meteor";
import {PuestosRoles} from "../../../../api/catalogos/puestosRoles/collection";


// Antigua manera de importar
var path = require('path');
// Obtenemos la ruta base para luego concatenarle lo demás.
var basePath = path.resolve('.').split('.meteor')[0].replace(/\/$/, '');
const csv = require('csvtojson');
var fs = require('fs');
var EMBARQUES, VENDEDORES, CAJERO, ALMACEN, CONTABILIDAD, PAGOS, NOMINAS, GERENTE, DIRECCION, MASTER = [];


Meteor.startup(function () {

    if (PuestosRoles.find().count() === 0) {

        PuestosRoles.insert({_id: 'EMBARQUES', roles: []});
        PuestosRoles.insert({_id: 'VENDEDORES', roles: []});
        PuestosRoles.insert({_id: 'CAJEROS', roles: []});
        PuestosRoles.insert({_id: 'ALMACEN', roles: []});
        PuestosRoles.insert({_id: 'CONTABILIDAD', roles: []});
        PuestosRoles.insert({_id: 'PAGOS', roles: []});
        PuestosRoles.insert({_id: 'NOMINAS', roles: []});
        PuestosRoles.insert({_id: 'GERENTES', roles: []});
        PuestosRoles.insert({_id: 'DIRECCION', roles: []});
        PuestosRoles.insert({_id: 'MASTER', roles: []});
    }

    if (Meteor.roles.find().count() === 0) {


        var readStream = fs.createReadStream(basePath + "/private/csv/permisos.csv");
        csv().fromStream(readStream).on('json', Meteor.bindEnvironment((jsonObject) => {
            let verbAbre = '';
            let permAbrev = '';

            if (jsonObject.VERBO) {
                verbAbre = jsonObject.VERBO.substring(0, 4);
            }
            if (jsonObject.PERMISOS) {
                let palabras = jsonObject.PERMISOS.split(' ');
                palabras.forEach((palabra, index)=> {
                    if (index < palabras.length - 1) {
                        permAbrev += palabra.substring(0, 4) + '_';
                    } else {
                        permAbrev += palabra.substring(0, 4);
                    }
                });
            }

            let rolName = verbAbre + '_' + permAbrev;
            rolName = rolName.toLowerCase();
            Meteor.roles.insert({name: rolName});

            if (jsonObject.EMBARQUES === 'SI') {
                PuestosRoles.update({_id: 'EMBARQUES'}, {$push: {roles: rolName}});
            }
            if (jsonObject.VENDEDORES === 'SI') {
                PuestosRoles.update({_id: 'VENDEDORES'}, {$push: {roles: rolName}});

            }
            if (jsonObject.CAJEROS === 'SI') {
                PuestosRoles.update({_id: 'CAJEROS'}, {$push: {roles: rolName}});

            }
            if (jsonObject.ALMACEN === 'SI') {
                PuestosRoles.update({_id: 'ALMACEN'}, {$push: {roles: rolName}});

            }
            if (jsonObject.CONTABILIDAD === 'SI') {
                PuestosRoles.update({_id: 'CONTABILIDAD'}, {$push: {roles: rolName}});

            }
            if (jsonObject.PAGOS === 'SI') {
                PuestosRoles.update({_id: 'PAGOS'}, {$push: {roles: rolName}});

            }
            if (jsonObject.NOMINAS === 'SI') {
                PuestosRoles.update({_id: 'NOMINAS'}, {$push: {roles: rolName}});

            }
            if (jsonObject.GERENTES === 'SI') {
                PuestosRoles.update({_id: 'GERENTES'}, {$push: {roles: rolName}});

            }
            if (jsonObject.DIRECCION === 'SI') {
                PuestosRoles.update({_id: 'DIRECCION'}, {$push: {roles: rolName}});

            }
            if (jsonObject.MASTER === 'SI') {
                PuestosRoles.update({_id: 'MASTER'}, {$push: {roles: rolName}});
            }

        }));
    }

    if (Meteor.users.find().count() === 0) {
        let user = {name: "UsUaRIoMaStEr", password: 'U$u4r1OM4$73R'};
        const puestosRoles = PuestosRoles.findOne({_id: '__global_roles__'});

        let id = Accounts.createUser({
            password: user.password,
            username: user.name,
            profile: {name: user.name}
        });

        Roles.addUsersToRoles(id, puestosRoles.roles, Roles.GLOBAL_GROUP);
    }




});