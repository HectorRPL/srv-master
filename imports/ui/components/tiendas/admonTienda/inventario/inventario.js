/**
 * Created by jvltmtz on 30/03/17.
 */
import "./inventario.html";

class Inventario{
    constructor($scope, $reactive, $state, $uibModal, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.titulo = 'Tiendas';
        this.$uibModal = $uibModal;

    }

}

const name = 'inventario';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: Inventario
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.inventario', {
            url: '/:tiendaId/inventario',
            template: '<inventario></inventario>'
        });
}