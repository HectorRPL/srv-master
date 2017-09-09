/**
 * Created by Héctor on 24/07/2017.
 */
import {Comisiones} from "../../../../../../api/comisiones/collection";
import {name as ComisionMarca} from "./comisionMarca/comisionMarca";
import {name as ComisionProducto} from "./comisionProducto/comisionProducto";
import {name as BuscarMarca} from "../../../../comun/busquedas/buscarMarca/buscarMarca";
import {name as BuscarProducto} from "../../../../comun/busquedas/buscarProducto/buscarProducto";
import {name as ListaProductosTienda} from "../../../../comun/listaProductosTienda/listaProductosTienda";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import template from "./aplicarComision.html";

class AplicarComision {

    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.comisionId = $stateParams.comisionId;

        this.subscribe('comisiones.todos', () =>[{_id: this.comisionId}]);
        this.helpers({
            comision() {
                return Comisiones.findOne({_id: this.comisionId});
            }
        });
    }
}

const name = 'aplicarComision';

export default angular
    .module(name, [
        BuscarMarca,
        BuscarProducto,
        ListaProductosTienda,
        Alertas,
        ComisionMarca,
        ComisionProducto
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: AplicarComision,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.comisiones.aplicar', {
            url: '/:comisionId/aplicar',
            template: '<aplicar-comision></aplicar-comision>',
            abstract: true
        });
}