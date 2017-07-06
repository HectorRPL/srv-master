/**
 * Created by jvltmtz on 30/03/17.
 */
import utilsPagination from "angular-utils-pagination";
import {Productos} from "../../../../../api/catalogos/productos/collection";
import {ProductosInventarios} from "../../../../../api/inventarios/productosInventarios/collection";
import {buscarMarcas} from "../../../../../api/catalogos/marcas/busquedas"
import {buscarProductos} from "../../../../../api/catalogos/productos/busquedas"
import {name as TituloPrincipal} from '../../../comun/tituloPrincipal/tituloPrincipal';
import {name as ListaProductosMarca} from './listaProductosMarca/listaProductosMarca';
import template from "./inventario.html";

class Inventario {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Inventario';
        this.tiendaId = $stateParams.tiendaId;


        this.perPage = 10;
        this.page = 1;
        this.subscribe('productos.id', () => [{_id: this.getReactively('producto._id')}]);
        this.subscribe('productosInventarios.tiendaMarca', () =>
            [

                {
                    tiendaId: this.getReactively('tiendaId'),
                    marcaId: this.getReactively('marca._id'),
                    productoId: this.getReactively('producto._id')
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]
        );
        this.helpers({
            productos(){
                return ProductosInventarios.find();
            },
            producto() {
                console.log(Productos.find());
                return Productos.find();
            },
            productosCount(){
                return Counts.get('numProdsInventarios');
            }
        });
    }

    buscarMarca(valor) {
        return buscarMarcas.callPromise({
            marca: valor
        }).then(function (result) {
            return result;
        });
    }

    buscarProducto(valor) {
        console.log(valor);
        return buscarProductos.callPromise({
            marcaId: this.getReactively('marca._id'),
            codigo: valor
        }).then(function (result) {
            return result;
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'inventario';

export default angular
    .module(name, [
        utilsPagination,
        TituloPrincipal,
        ListaProductosMarca
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Inventario
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.inventario', {
            url: '/inventario',
            template: '<inventario></inventario>'
        });
}