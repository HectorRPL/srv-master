/**
 * Created by jvltmtz on 15/11/17.
 */


Meteor.startup(function () {
    if (Meteor.roles.find({name: 'crea_ventas_cancelaciones'}).count() === 0) {

        Meteor.roles.insert({name: 'crea_ventas_cancelaciones'});
        Meteor.roles.insert({name: 'actu_ventas_cancelaciones'});
        Meteor.roles.insert({name: 'borr_ventas_cancelaciones'});

    }


    console.log('---------', Meteor.roles.find({name: 'crea_ventas_notas_credito'}).count());
    if (Meteor.roles.find({name: 'crea_ventas_notas_credito'}).count() === 0) {
        Meteor.roles.insert({name: 'crea_ventas_notas_credito'});
        Meteor.roles.insert({name: 'actu_ventas_notas_credito'});
        Meteor.roles.insert({name: 'borr_ventas_notas_credito'});

    }
});


