/**
 * Created by Héctor on 27/06/2017.
 */
import template from "./editarProveedor.html";
import ngAnimate from "angular-animate";
import {Proveedores} from "../../../../api/catalogos/proveedores/collection";
import {name as EditarProveedorGenerales} from "./editarProveedorGenerales/editarProveedorGenerales";
import {name as EditarProveedorDireccion} from "./editarProveedorDireccion/editarProveedorDireccion";
import {name as EditarProveedorFiscales} from "./editarProveedorFiscales/editarProveedorFiscales";
import {name as EditarProveedorCuentaContable} from "./editarProveedorCuentaContable/editarProveedorCuentaContable";
import {name as DesactivarProveedor} from "./desactivarProveedor/desactivarProveedor";

class EditarProveedor {
    constructor($scope, $state, $reactive, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.proveedorId = $stateParams.proveedorId;

        $scope.oneAtATime = true;

        this.nuevotitulo = 'Editar Proveedor';

        /*TODO: por alguna razón desconocida cuando doy click en dirección o en fiscales el nombre desaparece
        * lo he comparado con tiendas y no sucede eso. No sé a que se deba
        * */
        this.acordeon = [
            {titulo: 'Datos Generales', estado: '.generales',       icono: 'fa fa-book'},
            {titulo: 'Direccion',       estado: '.direccion',       icono: 'fa-map-marker'},
            {titulo: 'Datos Fiscales',  estado: '.fiscales',        icono: 'fa fa-address-card-o'},
            {titulo: 'Cuenta Contable', estado: '.cuentaContable',  icono: 'fa fa-gavel'},
            {titulo: 'Eliminar',        estado: '.desactivar',      icono: 'fa fa-trash-o'}
        ];

        this.subscribe('tiendas.todas',() => [{_id: this.proveedorId}]);
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
        ngAnimate,
        EditarProveedorGenerales,
        EditarProveedorDireccion,
        EditarProveedorFiscales,
        EditarProveedorCuentaContable,
        DesactivarProveedor
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
            url: '/:proveedorId/editar',
            template: '<editar-proveedor></editar-proveedor>',
            abstract: true
        });
}