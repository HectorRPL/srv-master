/**
 * Created by Héctor on 14/04/2017.
 */
import "./personal.html";

class Personal{
    constructor($scope, $reactive, $state, $uibModal, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        console.log('vamos a imprimir el this.tiendaId', this.tiendaId);
        this.titulo = 'Tiendas';
        this.$uibModal = $uibModal;

    }

}

const name = 'personal';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: Personal
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.personal', {
            url: '/:tiendaId/personal',
            template: '<personal></personal>'
        });
}