/**
 * Created by jvltmtz on 8/03/17.
 */

import template from "./usuarios.html";

class Usuarios {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }

}

const name = 'usuarios';

// create a module
export default angular
    .module(name, [
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Usuarios
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.usuarios', {
            url: '/usuarios',
            template: '<usuarios></usuarios>'
        });
}
