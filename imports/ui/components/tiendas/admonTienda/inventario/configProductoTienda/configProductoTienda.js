/**
 * Created by Héctor on 19/07/2017.
 */
import template from "./configProductoTienda.html";
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";
import {name as InventarioProductoFactor} from "./inventarioProductoFactor/inventarioProductoFactor";

class ConfigProductoTienda {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.productoId = $stateParams.productoId;

        this.subscribe('productosInventarios.detallesTiendaProducto', () => [
            {
                _id: this.getReactively('productoId')
            }
        ]);
        this.helpers({
            producto() {
                return ProductosInventarios.findOne();
            }
        });

    }
}

const name = 'configProductoTienda';

export default angular
    .module(name, [
        InventarioProductoFactor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ConfigProductoTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.inventario.producto', {
            url: '/:productoId/producto',
            template: '<config-producto-tienda></config-producto-tienda>'
        });
}

