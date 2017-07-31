/**
 * Created by jvltmtz on 15/07/17.
 */
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";
import {Promociones} from "../../../../../../api/promociones/collection";
import template from "./listaProductosPromocion.html";

class ListaProductosPromocion {

    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.promocionId = $stateParams.promocionId;
        console.log(this.promocionId);
        this.marcaSelec = '';
        this.productoSelec = '';

        this.perPage = 10;
        this.page = 1;

        this.subscribe('promociones.todos', () =>[{_id: this.promocionId}]);
        this.subscribe('productosInventarios.tiendaMarca', () => [
                {
                    tiendaId: this.getReactively('tiendaId'),
                    marcaId: this.getReactively('marcaSelec._id'),
                    productoId: this.getReactively('productoSelec._id'),
                    promocionId: this.getReactively('promocionId')
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
            },
            promocion() {
                return Promociones.findOne({_id: this.promocionId});
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }


}

const name = 'listaProductosPromocion';

export default angular
    .module(name, [ ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaProductosPromocion,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.promociones.productos', {
            url: '/:promocionId/productos',
            template: '<lista-productos-promocion></lista-productos-promocion>',
        });
}