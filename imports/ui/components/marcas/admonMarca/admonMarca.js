/**
 * Created by Héctor on 17/07/2017.
 */
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
// import {name as ListaProductos} from './listaProductos/listaProductos';
import template from "./admonMarca.html";

class AdmonMarca {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        /*
        this.marcaId = $stateParams.marcaId;

        this.subscribe('marcas.todas',() => [{_id: this.marcaId}]);

        this.helpers({
            marca(){
                return Marcas.findOne({_id: this.marcaId});
            }
        });

        this.tabs = [
            {titulo: "Catálogo", estado: ".productos.lista", icono: 'fa fa-pencil'},
            {titulo: "Editar", estado: ".editar.marca", icono: 'fa fa-info'},
        ];

        this.tab = 0;
         */
    }

}

const name = 'admonMarca';

export default angular
    .module(name, [
        TituloPrincipal,
        // ListaProductos
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