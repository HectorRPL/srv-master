/**
 * Created by Héctor on 30/06/2017.
 */
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import {name as EditarTiendaGenerales} from "./editarTiendaGenerales/editarTiendaGenerales";
import {name as EditarTiendaDireccion} from "./editarTiendaDireccion/editarTiendaDireccion";
import {name as EditarTiendaDatosFiscales} from "./editarTiendaDatosFiscales/editarTiendaDatosFiscales";
import {name as EditarTiendaCuentaContable} from "./editarTiendaCuentaContable/editarTiendaCuentaContable";
import {name as EliminarTienda} from "./eliminarTienda/eliminarTienda";
import {name as MostrarDireccion} from "../../comun/mostrar/mostrarDireccion/mostrarDireccion";
import {name as MostrarDatosFiscales} from "../../comun/mostrar/mostrarDatosFiscales/mostrarDatosFiscales";
import template from "./editarTienda.html";

class EditarTienda {
    constructor($scope, $state, $stateParams, $reactive) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;
        this.fole = 0;

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

        this.tiendaMatriz = [
            {titulo: "Datos Generales", estado: ".generales", icono: 'fa fa-book'},
            {titulo: "Dirección",       estado: ".direccion", icono: 'fa fa-book'},
            {titulo: "Datos Fiscales",  estado: ".fiscales", icono: 'fa fa-address-card-o'},
            {titulo: "Cuenta Contable", estado: ".cuentaContable", icono: 'fa fa-gavel'},
            {titulo: "Eliminar",        estado: ".eliminar", icono: 'fa fa-trash-o'}
        ];
        this.tiendaSucursal = [
            {titulo: "Datos Generales", estado: ".generales", icono: 'fa fa-book'},
            {titulo: "Dirección",       estado: ".direccion", icono: 'fa fa-book'},
            {titulo: "Eliminar",        estado: ".eliminar", icono: 'fa fa-trash-o'}
        ];

    }
}

const name = 'editarTienda';

export default angular
    .module(name, [
        EditarTiendaGenerales,
        EditarTiendaDireccion,
        EditarTiendaDatosFiscales,
        EditarTiendaCuentaContable,
        EliminarTienda,
        MostrarDireccion,
        MostrarDatosFiscales
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