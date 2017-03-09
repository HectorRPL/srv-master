/**
 * Created by jvltmtz on 8/03/17.
 */
import "./tiendas.html";

class Tiendas {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }

}

const name = 'tiendas';

// create a module
export default angular
    .module(name, [
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Tiendas
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tiendas', {
            url: '/tiendas',
            template: '<tiendas></tiendas>'
        });
}