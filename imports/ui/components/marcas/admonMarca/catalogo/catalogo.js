/**
 * Created by Héctor on 17/07/2017.
 */
import template from "./catalogo.html";
import {name as ListaProductos} from "./listaProductos/listaProductos";
// import {name as AgregarProducto} from "./agregarProducto/agregarProducto";
// import {name as EditarProducto} from "./editarProducto/editarProducto";

class Catalogo {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }
}

const name = 'catalogo';

// create a module
export default angular
    .module(name, [
        ListaProductos,
        // AgregarProducto,
        // EditarProducto
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Catalogo
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.marcas.admon.catalogo', {
            url: '/catalogo',
            template: '<catalogo></catalogo>',
            abstract: true
        });
}