/**
 * Created by jvltmtz on 29/03/17.
 */
import utilsPagination from "angular-utils-pagination";
import {name as BuscarFactor} from "../../../comun/busquedas/buscarFactor/buscarFactor";
import {name as ListaFactores} from "./listaFactores/listaFactores";
import {name as ListaProductosFactores} from "./listaProductosFactores/listaProductosFactores";
import template from "./factores.html";

class Factores {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Factores';
        this.tiendaId = $stateParams.tiendaId;
    }
}

const name = 'factores';

export default angular
    .module(name, [
        utilsPagination,
        BuscarFactor,
        ListaFactores,
        ListaProductosFactores,
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Factores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.factores', {
            url: '/factores',
            template: '<factores></factores>',
            abstract: true
        });
}