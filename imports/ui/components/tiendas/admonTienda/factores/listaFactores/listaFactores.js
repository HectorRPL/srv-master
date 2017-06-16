/**
 * Created by Héctor on 13/06/2017.
 */
import {Factores} from "../../../../../../api/factores/collection";
import {name as BuscarMarcaProducto} from "../../../../comun/buscarMarcaProducto/buscarMarcaProducto";
import {name as ListaProductosXMarca} from "../../../../comun/listaProductosXMarca/listaProductosXMarca";
import {name as AplicarFactorProductos} from "../aplicarFactorProductos/aplicarFactorProductos"
import utilsPagination from "angular-utils-pagination";
import "./listaFactores.html";

class ListaFactores {

    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.perPage = 15;
        this.page = 1;

        this.subscribe('factores.buscarUno', () =>
            [
                {
                    factorId: this.getReactively('factor._id')
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]
        );
        this.helpers({
            factores() {
                return Factores.find();
            },
            factoresCount(){
                return Counts.get('numfactores');
            }
        });

    }

    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'listaFactores';

export default angular
    .module(name, [
        BuscarMarcaProducto,
        ListaProductosXMarca,
        utilsPagination,
        AplicarFactorProductos
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/factores/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaFactores,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.factores.lista', {
            url: '/lista',
            template: '<lista-factores></lista-factores>',
        });
}
