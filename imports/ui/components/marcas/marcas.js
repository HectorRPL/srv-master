/**
 * Created by jvltmtz on 9/03/17.
 */
import template from "./marcas.html";
import {name as ListaMarcas} from "./listaMarcas/listaMarcas";

class Marcas {
    constructor() {
        'ngInject';
    }
}

const name = 'marcas';

// create a module
export default angular
    .module(name, [
        ListaMarcas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Marcas
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.marcas', {
            url: '/marcas',
            template: '<marcas></marcas>',
            abstract: true
        });
}
