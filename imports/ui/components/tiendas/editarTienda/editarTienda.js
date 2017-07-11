/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./editarTienda.html";
import {name as EditarTiendaGenerales} from "./editarTiendaGenerales/editarTiendaGenerales";
import {name as EditarTiendaFiscales} from "./editarTiendaFiscales/editarTiendaFiscales";
import {name as EditarTiendaCuentaContable} from "./editarTiendaCuentaContable/editarTiendaCuentaContable";
import {name as DesactivarTienda} from "./desactivarTienda/desactivarTienda";

class EditarTienda {
    constructor($state, $stateParams) {
        'ngInject';
        this.$state = $state;
        this.tiendaId = $stateParams.tiendaId;

        this.tabs = [
            {titulo: "Datos Generales", estado: ".generales", icono: 'fa fa-book'},
            {titulo: "Datos Fiscales",  estado: ".fiscales", icono: 'fa fa-address-card-o'},
            {titulo: "Cuenta Contable", estado: ".cuentaContable", icono: 'fa fa-gavel'},
            {titulo: "Eliminar", estado: ".desactivar", icono: 'fa fa-trash-o'}
        ];

        this.tab = 0;

    }
}

const name = 'editarTienda';

export default angular
    .module(name, [
        EditarTiendaGenerales,
        EditarTiendaFiscales,
        EditarTiendaCuentaContable,
        DesactivarTienda
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
        .state('app.tienda.editar', {
            url: '/editar/:tiendaId',
            template: '<editar-tienda></editar-tienda>',
            abstract: true
        });
}