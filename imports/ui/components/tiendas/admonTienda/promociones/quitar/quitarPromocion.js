/**
 * Created by Héctor on 31/10/2017.
 */
import {Promociones}                     from "../../../../../../api/promociones/collection";
import {name as QuitarPromocionMarca}    from "./quitarPromocionMarca/quitarPromocionMarca";
import {name as QuitarPromocionProducto} from "./quitarPromocionProducto/quitarPromocionProducto";
import {name as BuscarMarca}             from "../../../../comun/busquedas/buscarMarca/buscarMarca";
import {name as BuscarProducto}          from "../../../../comun/busquedas/buscarProducto/buscarProducto";
import {name as ListaProductosTienda}    from "../../../../comun/listaProductosTienda/listaProductosTienda";
import {name as Alertas}                 from "../../../../comun/alertas/alertas";
import template                          from "./quitarPromocion.html";

class QuitarPromocion {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.promocionId = $stateParams.promocionId;

        this.subscribe('promociones.todos', () => [{_id: this.promocionId}]);
        this.helpers({
            promocion() {
                return Promociones.findOne({_id: this.promocionId});
            }
        });
    }
}

const name = 'quitarPromocion';

export default angular
    .module(name, [
        BuscarMarca,
        BuscarProducto,
        ListaProductosTienda,
        Alertas,
        QuitarPromocionMarca,
        QuitarPromocionProducto
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: QuitarPromocion,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.promociones.quitar', {
            url: '/:promocionId/quitar',
            template: '<quitar-promocion></quitar-promocion>',
            abstract: true
        });
}