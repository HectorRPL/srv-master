/**
 * Created by jvltmtz on 30/03/17.
 */
import "./comisiones.html";

class Comisiones {
    constructor($scope, $reactive, $state, $uibModal, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.titulo = 'Comisiones';
        this.$uibModal = $uibModal;

    }

}

const name = 'comisiones';

// create a module
export default angular
    .module(name, [

    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/${name}/${name}.html`,
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