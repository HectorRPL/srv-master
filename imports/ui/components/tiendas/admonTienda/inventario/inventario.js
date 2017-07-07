/**
 * Created by jvltmtz on 30/03/17.
 */
import {name as TituloPrincipal} from '../../../comun/tituloPrincipal/tituloPrincipal';
import {name as ListaMarcasTienda} from './listaMarcasTienda/listaMarcasTienda';
import {name as ExistenciaProductosTienda} from './existenciaProductosTienda/existenciaProductosTienda';

import utilsPagination from "angular-utils-pagination";
import template from "./inventario.html";

class Inventario {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Inventario';

        this.tiendaId = $stateParams.tiendaId;
    }
}

const name = 'inventario';

export default angular
    .module(name, [
        TituloPrincipal,
        ListaMarcasTienda,
        ExistenciaProductosTienda,
        utilsPagination
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Inventario
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.inventario', {
            url: '/inventario',
            template: '<inventario></inventario>',
            abstract: true
        });
}