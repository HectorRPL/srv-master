/**
 * Created by jvltmtz on 8/03/17.
 */
import "./tiendas.html";
import {Tiendas} from "../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../comun/tituloPrincipal/tituloPrincipal';
import {name as ListaTiendas} from './listaTiendas/listaTiendas';
import {name as AdmonTienda} from './admonTienda/admonTienda';

class TiendasClass {
    constructor($state) {
        'ngInject';
        this.$state = $state;
        this.titulo = 'Tiendas';
    }

}

const name = 'tiendas';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        ListaTiendas,
        AdmonTienda
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
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