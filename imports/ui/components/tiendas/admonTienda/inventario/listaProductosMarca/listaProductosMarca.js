/**
 * Created by Héctor on 19/04/2017.
 */
import utilsPagination from "angular-utils-pagination";
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";
import {name as TituloPrincipal} from '../../../../comun/tituloPrincipal/tituloPrincipal';
import {altaInventarioMarca} from  "../../../../../../api/inventarios/methods"
import template from "./listaProductosMarca.html";

class ListaProductosMarca {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Ordenes de Compra';
        this.tiendaId = $stateParams.tiendaId;
        this.marcaId = $stateParams.marcaId;
        this.perPage = 30;
        this.page = 1;

        this.subscribe('productosInventarios.tiendaMarca', () => [
                {
                    tiendaId: this.tiendaId,
                    marcaId: this.marcaId
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
            productosCount(){
                return Counts.get('numProdsInventarios');
            }
        });

    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    crearInventario() {
        const info = {tiendaId: this.tiendaId, marcaId: this.marcaId};
        altaInventarioMarca.call(info, this.$bindToContext((err, result)=> {
            if(err){
            }
        }));
    }
}

const name = 'listaProductosMarca';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        utilsPagination
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaProductosMarca
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.productosmarca', {
            url: '/:tiendaId/productos/:marcaId',
            template: '<lista-productos-marca></lista-productos-marca>'
        });
}