/**
 * Created by Héctor on 24/07/2017.
 */
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";
import {Comisiones} from "../../../../../../api/comisiones/collection";
import {name as BuscarMarca} from "../../../../comun/busquedas/buscarMarca/buscarMarca";
import {name as BuscarProducto} from "../../../../comun/busquedas/buscarProducto/buscarProducto";
import template from "./listaProductosComision.html";

class ListaProductosComision {

    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.comisionId = $stateParams.comisionId;

        this.marcaSelec = '';
        this.productoSelec = '';

        this.perPage = 10;
        this.page = 1;

        this.subscribe('comisiones.todos', () =>[{_id: this.comisionId}]);
        this.subscribe('productosInventarios.tiendaMarca', () => [
            {
                tiendaId: this.getReactively('tiendaId'),
                marcaId: this.getReactively('marcaSelec._id'),
                productoId: this.getReactively('productoSelec._id'),
                comisionId: this.getReactively('comisionId')
            },
            {
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage)
            }
        ]);
        this.helpers({
            comision() {
                console.log('[38]', Comisiones.findOne(this.comisionId));
                return Comisiones.findOne({_id: this.comisionId});
            },
            productos(){
                console.log('[42]', ProductosInventarios.find());
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

const name = 'listaProductosComision';

export default angular
    .module(name, [
        BuscarMarca,
        BuscarProducto
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaProductosComision,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.comisiones.productos', {
            url: '/:comisionId/productos',
            template: '<lista-productos-comision></lista-productos-comision>',
        });
}