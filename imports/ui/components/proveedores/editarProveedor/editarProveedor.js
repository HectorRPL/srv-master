/**
 * Created by Héctor on 27/06/2017.
 */
import template from "./editarProveedor.html";
import {name as EditarProveedorGenerales} from "./editarProveedorGenerales/editarProveedorGenerales";
import {name as EditarProveedorFiscales} from "./editarProveedorFiscales/editarProveedorFiscales";
import {name as EditarProveedorCuentaContable} from "./editarProveedorCuentaContable/editarProveedorCuentaContable";

class EditarProveedor {
    constructor($state, $stateParams) {
        'ngInject';
        this.$state = $state;
        this.proveedorId = $stateParams.proveedorId;

        this.tabs = [
            {titulo: "Datos Generales", estado: ".generales", icono: 'fa fa-book'},
            {titulo: "Datos Fiscales",  estado: ".fiscales", icono: 'fa fa-address-card-o'},
            {titulo: "Cuenta Contable", estado: ".cuentaContable", icono: 'fa fa-gavel'}
        ];

        this.tab = 0;

    }
}

const name = 'editarProveedor';

export default angular
    .module(name, [
        EditarProveedorGenerales,
        EditarProveedorFiscales,
        EditarProveedorCuentaContable
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarProveedor
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar', {
            url: '/editar/:proveedorId',
            template: '<editar-proveedor></editar-proveedor>',
            abstract: true
        });
}