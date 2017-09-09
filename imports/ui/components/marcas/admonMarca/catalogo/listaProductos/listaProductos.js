/**
 * Created by Héctor on 17/07/2017.
 */
import template from "./listaProductos.html";
import {Productos} from "../../../../../../api/catalogos/productos/collection";
import {name as BuscarMarca} from "../../../../comun/busquedas/buscarProducto/buscarProducto";

class ListaProductos {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;

        this.perPage = 10;
        this.page = 1;
        this.marcaSelec = '';
        this.subscribe('productos.todo', () =>
            [
                {
                    _id: this.getReactively('marcaSelec._id'),
                    activo: true
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }

            ]
        );

        this.helpers({
            productos(){
                return Productos.find();
            },
            productosCount(){
                return Counts.get('numProductos');
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'listaProductos';

export default angular
    .module(name, [
        BuscarMarca
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ListaProductos
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.marcas.admon.catalogo.lista', {
            url: '/lista',
            template: '<lista-productos></lista-productos>'
        });
}