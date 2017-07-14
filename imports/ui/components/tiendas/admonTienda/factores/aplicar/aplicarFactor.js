/**
 * Created by jvltmtz on 27/06/17.
 */
import {Factores} from "../../../../../../api/factores/collection";
import {name as FactorMarca} from "./factorMarca/factorMarca";
import {name as FactorProducto} from "./factorProducto/factorProdcuto";
import {name as ConfirmarOperacion} from "../../../../comun/modales/confirmarOperacion/confirmarOperacion";
import {name as BuscarMarca} from "../../../../comun/busquedas/buscarMarca/buscarMarca";
import {name as BuscarProducto} from "../../../../comun/busquedas/buscarProducto/buscarProducto";
import {name as ListaProductosTienda} from "../../../../comun/listaProductosTienda/listaProductosTienda";
import {name as ListaProductosElegidos} from "../../../../comun/listaProductosElegidos/listaProductosElegidos";
import {name as Alertas} from "../../../../comun/alertas/alertas"
import template from "./aplicarFactor.html";

class AplicarFactor {

    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.factorId = $stateParams.factorId;

        this.subscribe('factores.todos', () =>[{_id: this.factorId}]);
        this.helpers({
            factor() {
                return Factores.findOne({_id: this.factorId});
            }
        });
    }
}

const name = 'aplicarFactor';

export default angular
    .module(name, [
        FactorMarca,
        FactorProducto,
        ConfirmarOperacion,
        BuscarMarca,
        BuscarProducto,
        ListaProductosTienda,
        ListaProductosElegidos,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AplicarFactor,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.factores.aplicar', {
            url: '/:factorId/aplicar',
            template: '<aplicar-factor></aplicar-factor>',
            abstract: true
        });
}