/**
 * Created by jvltmtz on 8/03/17.
 */
import "./tiendas.html";
import {Tiendas} from "../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../comun/tituloPrincipal/tituloPrincipal';
import {name as ListaTiendas} from './listaTiendas/listaTiendas';
import {name as AdministrarTienda} from './administrarTienda/administrarTienda';

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
        AdministrarTienda
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
        .state('app.tiendas', {
            url: '/tiendas',
            template: '<tiendas></tiendas>',
            abstract: true
        });
}