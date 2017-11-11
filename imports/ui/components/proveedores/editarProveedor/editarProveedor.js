/**
 * Created by Héctor on 27/06/2017.
 */
import {Proveedores} from "../../../../api/catalogos/proveedores/collection";
import {name as EditarProveedorGenerales} from "./editarProveedorGenerales/editarProveedorGenerales";
import {name as EditarMarcasProveedores} from "./editarMarcasProveedores/editarMarcasProveedores";
import {name as EditarProveedorDireccion} from "./editarProveedorDireccion/editarProveedorDireccion";
import {name as EditarProveedorDatosFiscales} from "./editarProveedorDatosFiscales/editarProveedorDatosFiscales";
import {name as EditarProveedorCuentaContable} from "./editarProveedorCuentaContable/editarProveedorCuentaContable";
import {name as DesactivarProveedor} from "./desactivarProveedor/desactivarProveedor";
import {name as MostrarDireccion} from "../../comun/mostrar/mostrarDireccion/mostrarDireccion";
import {name as MostrarDatosFiscales} from "../../comun/mostrar/mostrarDatosFiscales/mostrarDatosFiscales";
import template from "./editarProveedor.html";

class EditarProveedor {
    constructor($scope, $state, $stateParams, $reactive) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.proveedorId = $stateParams.proveedorId;
        this.tab = 0;

        this.tabs = [
            {titulo: 'Datos Generales', estado: '.generales', icono: 'fa fa-book'},
            {titulo: 'Marcas', estado: '.marcas', icono: 'fa fa-star-o'},
            {titulo: 'Direccion', estado: '.direccion', icono: 'fa-map-marker'},
            {titulo: 'Datos Fiscales', estado: '.fiscales', icono: 'fa fa-address-card-o'},
            {titulo: 'Cuenta Contable', estado: '.cuentaContable', icono: 'fa fa-gavel'},
            {titulo: 'Eliminar', estado: '.desactivar', icono: 'fa fa-trash-o'}
        ];

        this.subscribe('proveedores.todos', () => [{_id: this.proveedorId}]);
        this.helpers({
            proveedor(){
                return Proveedores.findOne({_id: this.proveedorId});
            }
        });
    }
}

const name = 'editarProveedor';

export default angular
    .module(name, [
        EditarProveedorGenerales,
        EditarMarcasProveedores,
        EditarProveedorDireccion,
        EditarProveedorDatosFiscales,
        EditarProveedorCuentaContable,
        DesactivarProveedor,
        MostrarDireccion,
        MostrarDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarProveedor
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar', {
            url: '/:proveedorId/editar',
            template: '<editar-proveedor></editar-proveedor>',
            abstract: true
        });
}