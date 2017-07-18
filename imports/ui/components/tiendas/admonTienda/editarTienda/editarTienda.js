/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./editarTienda.html";
import ngAnimate from "angular-animate";
import {name as EditarTiendaGenerales} from "./editarTiendaGenerales/editarTiendaGenerales";
import {name as EditarTiendaFiscales} from "./editarTiendaFiscales/editarTiendaFiscales";
import {name as EditarTiendaCuentaContable} from "./editarTiendaCuentaContable/editarTiendaCuentaContable";
import {name as EliminarTienda} from "./eliminarTienda/eliminarTienda";

class EditarTienda {
    constructor($scope, $state, $stateParams) {
        'ngInject';
        this.$state = $state;

        this.tiendaId = $stateParams.tiendaId;

        $scope.oneAtATime = true;

        this.acordeon = [
            {titulo: "Datos Generales", estado: "app.tienda.admon.editar.generales", icono: 'fa fa-book'},
            {titulo: "Datos Fiscales",  estado: "app.tienda.admon.editar.fiscales", icono: 'fa fa-address-card-o'},
            {titulo: "Cuenta Contable", estado: "app.tienda.admon.editar.cuentaContable", icono: 'fa fa-gavel'},
            {titulo: "Eliminar",        estado: "app.tienda.admon.editar.eliminar", icono: 'fa fa-trash-o'}
        ];
    }
}

const name = 'editarTienda';

export default angular
    .module(name, [
        ngAnimate,
        EditarTiendaGenerales,
        EditarTiendaFiscales,
        EditarTiendaCuentaContable,
        EliminarTienda
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.editar', {
            url: '/editar',
            template: '<editar-tienda></editar-tienda>',
            abstract: true
        });
}