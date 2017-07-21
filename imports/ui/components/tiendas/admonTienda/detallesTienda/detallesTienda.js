/**
 * Created by Héctor on 10/07/2017.
 */
import template from "./detallesTienda.html";
import {name as InfoTienda} from "./infoTienda/infoTienda";

class DetallesTienda {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;

    }
}

const name = 'detallesTienda';

export default angular
    .module(name, [
        InfoTienda
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetallesTienda
    }).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.detalles.', {
            url: '/detalles',
            template: '<detalles-tienda></detalles-tienda>',
            abstract: true
        });
}