/**
 * Created by jvltmtz on 26/06/17.
 */
import template from "./listaMarcas.html";
import {Marcas} from "../../../../api/catalogos/marcas/collection";
import {name as AgregarMarca} from "../agregarMarca/agregarMarca";

class ListaMarcas {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.$uibModal = $uibModal;

        this.titulo = 'Marcas';

        // /*
        this.marcaSelec = '';
        this.perPage = 10;
        this.page = 1;
        this.subscribe('marcas.todas', ()=> [
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
        // */
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    modalAgregar() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarMarca',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
        });
    }

}

const name = 'listaMarcas';

// create a module
export default angular
    .module(name, [
        AgregarMarca
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaMarcas
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.marcas.lista', {
            url: '/lista',
            template: '<lista-marcas></lista-marcas>'
        });
}