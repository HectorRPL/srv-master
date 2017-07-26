/**
 * Created by Héctor on 30/06/2017.
 */
import ngAnimate from "angular-animate";
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import {name as EditarTiendaGenerales} from "./editarTiendaGenerales/editarTiendaGenerales";
import {name as TiendaDireccion} from "./tiendaDireccion/tiendaDireccion";
import {name as EditarTiendaFiscales} from "./editarTiendaFiscales/editarTiendaFiscales";
import {name as EditarTiendaCuentaContable} from "./editarTiendaCuentaContable/editarTiendaCuentaContable";
import {name as EliminarTienda} from "./eliminarTienda/eliminarTienda";
import template from "./editarTienda.html";

class EditarTienda {
    constructor($scope, $state, $stateParams, $reactive) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;

        this.subscribe('tiendas.todas', () =>
            [
                {
                    _id: this.tiendaId
                }
            ]);
        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });
        this.tabs = [
            {titulo: "Empleados", estado: ".empleados.lista", icono: 'fa fa-users'},
            {titulo: "Inventario", estado: ".inventario.lista", icono: 'fa fa-cubes'},
            {titulo: "Factores", estado: ".factores.lista", icono: 'fa fa-money'},
            {titulo: "Comisiones", estado: ".comisiones.lista", icono: 'fa fa-briefcase'},
            {titulo: "Promociones", estado: ".promociones.lista", icono: 'fa fa-hand-o-down'},
        ];

        $scope.oneAtATime = true;
        this.acordeon = [
            {titulo: "Datos Generales", estado: "app.tienda.editar.generales", icono: 'fa fa-book'},
            {titulo: "Dirección",       estado: "app.tienda.editar.direccion", icono: 'fa fa-book'},
            {titulo: "Datos Fiscales",  estado: "app.tienda.editar.fiscales", icono: 'fa fa-address-card-o'},
            {titulo: "Cuenta Contable", estado: "app.tienda.editar.cuentaContable", icono: 'fa fa-gavel'},
            {titulo: "Eliminar",        estado: "app.tienda.editar.eliminar", icono: 'fa fa-trash-o'}
        ];
    }
}

const name = 'editarTienda';

export default angular
    .module(name, [
        ngAnimate,
        EditarTiendaGenerales,
        TiendaDireccion,
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
        .state('app.tienda.editar', {
            url: '/:tiendaId/editar',
            template: '<editar-tienda></editar-tienda>',
            abstract: true
        });
}