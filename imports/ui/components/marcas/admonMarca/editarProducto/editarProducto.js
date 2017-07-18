/**
 * Created by Héctor on 18/07/2017.
 */
import template from "./editarProducto.html";
import ngAnimate from "angular-animate";
import {Proveedores} from "../../../../../api/catalogos/productos/collection";
import {name as DesactivarMarca} from "./desactivarProducto/desactivarProducto";

class EditarProducto {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);

        this.productoId = $stateParams.productoId;

        $scope.oneAtATime = true;

        this.nuevotitulo = 'Editar Proveedor';

        this.acordeon = [
            {titulo: 'Eliminar', estado: '.desactivar', icono: 'fa fa-trash-o'}
        ];

        /*
        this.subscribe('productos.todos',() => [{_id: this.productoId}]);
        this.helpers({
            producto(){
                return Proveedores.findOne({_id: this.productoId});
            }
        });
        */
    }
}

const name = 'editarProducto';

export default angular
    .module(name, [
        ngAnimate,
        DesactivarMarca
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarProducto
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.marcas.admon.editar', {
            url: '/editar/:productoId',
            template: '<editar-producto></editar-producto>',
            abstract: true
        });
}