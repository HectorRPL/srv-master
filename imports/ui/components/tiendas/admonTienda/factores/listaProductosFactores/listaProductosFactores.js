/**
 * Created by jvltmtz on 13/07/17.
 */
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";
import {Factores} from "../../../../../../api/factores/collection";
import template from "./listaProductosFactores.html";

class ListaProductosFactores {

    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.factorId = $stateParams.factorId;
        this.marcaSelec = '';
        this.productoSelec = '';

        this.perPage = 10;
        this.page = 1;

        this.subscribe('factores.todos', () =>[{_id: this.factorId}]);
        this.subscribe('productosInventarios.tiendaMarca', () => [
                {
                    tiendaId: this.getReactively('tiendaId'),
                    marcaId: this.getReactively('marcaSelec._id'),
                    productoId: this.getReactively('productoSelec._id'),
                    factorId: this.getReactively('factorId')
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
            factor() {
                return Factores.findOne({_id: this.factorId});
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }


}

const name = 'listaProductosFactores';

export default angular
    .module(name, [ ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ListaProductosFactores,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.factores.productos', {
            url: '/:factorId/productos',
            template: '<lista-productos-factores></lista-productos-factores>',
        });
}