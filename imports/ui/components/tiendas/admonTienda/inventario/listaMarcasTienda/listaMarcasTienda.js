/**
 * Created by jvltmtz on 26/06/17.
 */
import {Marcas} from "../../../../../../api/catalogos/marcas/collection";
import template from "./listaMarcasTienda.html";

class ListaMarcasTienda {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;
        this.marcaId = $stateParams.marcaId;

        this.titulo = 'Marcas';

        this.marcaSelec = '';
        this.perPage = 10;
        this.page = 1;
        this.subscribe('marcas.todas', () => [
            {
                _id: this.getReactively('marcaSelec._id')
            },
            {
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage)
            }

        ]);
        this.helpers({
            marcas(){
                return Marcas.find();
            },
            marcasCount(){
                return Counts.get('numMarcas');
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'listaMarcasTienda';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaMarcasTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.inventario.lista', {
            url: '/marcas',
            template: '<lista-marcas-tienda></lista-marcas-tienda>'
        });
}