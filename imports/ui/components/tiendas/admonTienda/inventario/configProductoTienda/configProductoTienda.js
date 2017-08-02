/**
 * Created by Héctor on 19/07/2017.
 */
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";
import {name as InventarioProductoFactor} from "./inventarioProductoFactor/inventarioProductoFactor";
import {name as ReasignarFactorProducto} from "./inventarioProductoFactor/reasignarFactorProducto/reasignarFactorProducto";
import template from "./configProductoTienda.html";

class ConfigProductoTienda {
    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;

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

    reasignarFactorModal(productoInventario, nombreProducto) {
        productoInventario.nombreProducto = nombreProducto;
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'ReasignarFactorProducto',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
            resolve: {
                productoInventario: function () {
                    return productoInventario;
                }
            }
        });
    }
}

const name = 'configProductoTienda';

export default angular
    .module(name, [
        InventarioProductoFactor,
        ReasignarFactorProducto
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

