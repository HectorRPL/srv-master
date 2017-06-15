/**
 * Created by jvltmtz on 29/03/17.
 */
import {name as AgregarFactor} from "./agregarFactor/agregarFactor";
import {name as AplicarFactorProductos} from "./aplicarFactorProductos/aplicarFactorProductos";
import {name as BuscarFactor} from "../../../comun/buscarFactor/buscarFactor";
import {name as ListaFactores} from "./listaFactores/listaFactores";
import utilsPagination from "angular-utils-pagination";
import "./factores.html";

class Factores {

    constructor($scope, $reactive, $state, $uibModal, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Factores';
        this.$uibModal = $uibModal;
        this.tiendaId = $stateParams.tiendaId;
    }

    crearFactor() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarFactor',
            backdrop: 'static',
            size: 'md',
            keyboard: true
        });
    }

    aplicarFactor() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AplicarFactor',
            backdrop: 'static',
            size: 'lg',
            keyboard: true
        });
    }
}

const name = 'factores';

// create a module
export default angular
    .module(name, [
        AgregarFactor,
        AplicarFactorProductos,
        BuscarFactor,
        ListaFactores,
        utilsPagination
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: Factores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.factores', {
            url: '/:tiendaId/factores',
            template: '<factores></factores>'
        });
}