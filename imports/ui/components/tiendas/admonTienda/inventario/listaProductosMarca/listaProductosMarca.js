/**
 * Created by Héctor on 19/04/2017.
 */
import utilsPagination from "angular-utils-pagination";
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";
import {name as TituloPrincipal} from '../../../../comun/tituloPrincipal/tituloPrincipal';
import "./listaProductosMarca.html";

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
}

const name = 'listaProductosMarca';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        utilsPagination
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/inventario/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaProductosMarca
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.productosmarca', {
            url: '/:tiendaId/:marcaId/productosmarca',
            template: '<lista-productos-marca></lista-productos-marca>'
        });
}