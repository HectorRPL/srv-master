/**
 * Created by jvltmtz on 8/03/17.
 */
import template from "./tiendas.html";
import {name as ListaTiendas} from './listaTiendas/listaTiendas';
import {name as AdmonTienda} from './admonTienda/admonTienda';
import {name as EditarTienda} from './editarTienda/editarTienda';

class TiendasClass {
    constructor() {
        'ngInject';
    }

}

const name = 'tiendas';

export default angular
    .module(name, [
        ListaTiendas,
        AdmonTienda,
        EditarTienda
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: TiendasClass
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda', {
            url: '/tienda',
            template: '<tiendas></tiendas>',
            abstract: true
        });
}