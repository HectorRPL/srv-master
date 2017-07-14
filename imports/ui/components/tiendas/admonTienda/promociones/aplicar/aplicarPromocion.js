/**
 * Created by jvltmtz on 11/07/17.
 */
import {Promociones} from "../../../../../../api/promociones/collection";
import {name as PromocionMarca} from "./promocionMarca/promocionMarca";
import {name as PromocionProducto} from "./promocionProducto/promocionProducto";
import {name as BuscarMarca} from "../../../../comun/busquedas/buscarMarca/buscarMarca";
import {name as BuscarProducto} from "../../../../comun/busquedas/buscarProducto/buscarProducto";
import {name as ListaProductosTienda} from "../../../../comun/listaProductosTienda/listaProductosTienda";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import template from "./aplicarPromocion.html";

class AplicarPromocion {

    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.promocionId = $stateParams.promocionId;

        this.subscribe('promociones.todos', () =>[{_id: this.promocionId}]);
        this.helpers({
            promocion() {
                return Promociones.findOne({_id: this.promocionId});
            }
        });
    }
}

const name = 'aplicarPromocion';

export default angular
    .module(name, [
        BuscarMarca,
        BuscarProducto,
        ListaProductosTienda,
        Alertas,
        PromocionMarca,
        PromocionProducto
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AplicarPromocion,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.promociones.aplicar', {
            url: '/:promocionId/aplicar',
            template: '<aplicar-promocion></aplicar-promocion>',
            abstract: true
        });
}