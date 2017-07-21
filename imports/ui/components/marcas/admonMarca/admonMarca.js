/**
 * Created by Héctor on 17/07/2017.
 */
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
import {name as Catalogo} from './catalogo/catalogo';
import {name as EditarProducto} from './editarProducto/editarProducto';

import template from "./admonMarca.html";

class AdmonMarca {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tabs = [
            {titulo: "Catálogo", estado: ".catalogo.lista", icono: 'fa fa-list'},
            {titulo: "Editar", estado: ".editar.desactivar", icono: 'fa fa-pencil'},
        ];

        this.tab = 0;

        /*
        this.marcaId = $stateParams.marcaId;

        this.subscribe('marcas.todas',() => [{_id: this.marcaId}]);

        this.helpers({
            marca(){
                return Marcas.findOne({_id: this.marcaId});
            }
        });
         */
    }

}

const name = 'admonMarca';

export default angular
    .module(name, [
        TituloPrincipal,
        Catalogo,
        EditarProducto
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AdmonMarca
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.marcas.admon', {
            url: '/:marcaId',
            template: '<admon-marca></admon-marca>',
            abstract: true
        });
}