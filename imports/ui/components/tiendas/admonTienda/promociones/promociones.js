/**
 * Created by jvltmtz on 7/07/17.
 */

import {name as ListaPromociones} from "./listaPromociones/listaPromociones";
import utilsPagination from "angular-utils-pagination";
import template from "./promociones.html";

class Promociones {

    constructor($scope, $reactive, $state, $uibModal, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Promociones';
        this.$uibModal = $uibModal;
        this.tiendaId = $stateParams.tiendaId;
    }
}

const name = 'promociones';

// create a module
export default angular
    .module(name, [
        ListaPromociones,
        utilsPagination
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Promociones
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.promociones', {
            url: '/promociones',
            template: '<promociones></promociones>',
            abstract: true
        });
}