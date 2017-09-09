/**
 * Created by jvltmtz on 30/03/17.
 */
import {name as ListaComisiones} from "./listaComisiones/listaComisiones";
import {name as ListaProductosComision} from "./listaProductosComision/listaProductosComision";
import utilsPagination from "angular-utils-pagination";
import template from "./comisiones.html";

class Comisiones {

    constructor($scope, $reactive, $state, $uibModal, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Comisiones';
        this.$uibModal = $uibModal;

        this.tiendaId = $stateParams.tiendaId;
    }
}

const name = 'comisiones';

export default angular
    .module(name, [
        ListaComisiones,
        utilsPagination,
        ListaProductosComision
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Comisiones
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.comisiones', {
            url: '/comisiones',
            template: '<comisiones></comisiones>',
            abstract: true
        });
}